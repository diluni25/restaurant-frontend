import { useEffect, useMemo, useState } from "react";
import {
  Upload,
  Search,
  Trash2,
  Copy,
  Save,
  SlidersHorizontal,
  Image as ImageIcon,
} from "lucide-react";
import { defaultAssets, assetCategories } from "../data/imageData";

const STORAGE_KEY = "tastoria-image-library";

function getInitialAssets() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultAssets;
  } catch {
    return defaultAssets;
  }
}

const formatSize = (size) =>
  size >= 1 ? `${size.toFixed(2)} MB` : `${Math.round(size * 1024)} KB`;

export default function ImageManagement() {
  const [assets, setAssets] = useState(getInitialAssets);
  const [selectedId, setSelectedId] = useState("AS-001");
  const [category, setCategory] = useState("All Assets");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [focal, setFocal] = useState({ x: 50, y: 50 });
  const [storageError, setStorageError] = useState("");

  const selected = assets.find((asset) => asset.id === selectedId);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
      setStorageError("");
    } catch {
      setStorageError("Browser storage is full. New changes may not persist.");
    }
  }, [assets]);

  useEffect(() => {
    if (selected) {
      setFocal({
        x: selected.focalX ?? 50,
        y: selected.focalY ?? 50,
      });
    }
  }, [selectedId, assets]);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();

    const result = assets.filter((asset) => {
      const categoryMatch =
        category === "All Assets" || asset.category === category;

      const searchMatch =
        asset.name.toLowerCase().includes(query) ||
        asset.label.toLowerCase().includes(query) ||
        asset.category.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });

    return result.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "size") return b.size - a.size;
      return (b.uploadedAt || "").localeCompare(a.uploadedAt || "");
    });
  }, [assets, category, search, sort]);

  const usedMB = assets.reduce((sum, asset) => sum + asset.size, 0);

  const quotaMB = 20;
  const percent = Math.min(100, (usedMB / quotaMB) * 100);

  const categoryCounts = (name) =>
    assets.filter((asset) => name === "All Assets" || asset.category === name)
      .length;

  const uploadAssets = async (event) => {
    const files = Array.from(event.target.files || []);

    for (const file of files) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        alert(`${file.name}: unsupported image format`);
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name}: maximum size is 5 MB`);
        continue;
      }

      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const imageInfo = await new Promise((resolve) => {
        const image = new Image();
        image.onload = () =>
          resolve({
            width: image.naturalWidth,
            height: image.naturalHeight,
          });
        image.onerror = () =>
          resolve({
            width: 0,
            height: 0,
          });
        image.src = dataUrl;
      });

      const asset = {
        id: `AS-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        label: file.name.replace(/\.[^.]+$/, "").replaceAll("_", " "),
        category: category === "All Assets" ? "Dishes & Menu" : category,
        image: dataUrl,
        width: imageInfo.width,
        height: imageInfo.height,
        size: file.size / (1024 * 1024),
        mime: file.type,
        focalX: 50,
        focalY: 50,
        uploadedAt: new Date().toISOString(),
        references: [],
      };

      setAssets((previous) => [asset, ...previous]);
      setSelectedId(asset.id);
    }

    event.target.value = "";
  };

  const saveFocal = () => {
    if (!selected) return;

    setAssets((previous) =>
      previous.map((asset) =>
        asset.id === selected.id
          ? {
              ...asset,
              focalX: focal.x,
              focalY: focal.y,
            }
          : asset,
      ),
    );
  };

  const removeAsset = () => {
    if (!selected) return;
    if (!window.confirm(`Delete ${selected.name}?`)) return;

    const remaining = assets.filter((asset) => asset.id !== selected.id);

    setAssets(remaining);
    setSelectedId(remaining[0]?.id || null);
  };

  const copyImage = async () => {
    if (!selected) return;

    try {
      await navigator.clipboard.writeText(selected.image);
      alert("Image reference copied.");
    } catch {
      alert("Could not copy the image reference.");
    }
  };

  const selectAsset = (asset) => {
    setSelectedId(asset.id);
  };

  return (
    <div className="asset-page">
      <div className="asset-page-top">
        <div>
          <p className="asset-overline">
            SILVA ASSET ENGINE
            <span> · LOCAL ASSET LIBRARY</span>
          </p>
          <h1>Media & Asset Library</h1>
          <p className="asset-muted">
            {usedMB.toFixed(2)} MB of {quotaMB} MB demo quota ({assets.length}{" "}
            assets)
          </p>
        </div>

        <div className="asset-top-actions">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recent">Sort: Recent First</option>
            <option value="name">Sort: Name</option>
            <option value="size">Sort: File Size</option>
          </select>

          <label className="asset-orange-btn">
            <Upload size={17} />
            + Upload New Assets
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              hidden
              onChange={uploadAssets}
            />
          </label>
        </div>
      </div>

      <section className="asset-storage">
        <div className="asset-storage-heading">
          <strong>Storage Distribution</strong>
          <span>{percent.toFixed(0)}% demo quota</span>
          <span>{assets.length} assets</span>
          <span>Available: {Math.max(0, quotaMB - usedMB).toFixed(2)} MB</span>
        </div>

        <div className="asset-progress">
          <div style={{ width: `${percent}%` }} />
        </div>
      </section>

      {storageError && <p className="asset-error">{storageError}</p>}

      <div className="asset-filters">
        <div className="asset-tabs">
          {assetCategories.map((name) => (
            <button
              key={name}
              className={category === name ? "active" : ""}
              onClick={() => setCategory(name)}
            >
              {name} ({categoryCounts(name)})
            </button>
          ))}
        </div>

        <div className="asset-search">
          <Search size={16} />
          <input
            placeholder="Filter by keyword or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="asset-workspace">
        <section className="asset-grid">
          {filtered.map((asset) => (
            <button
              key={asset.id}
              className={`asset-tile ${
                selectedId === asset.id ? "selected" : ""
              }`}
              onClick={() => selectAsset(asset)}
            >
              <div className="asset-tile-image">
                <img
                  src={asset.image}
                  alt={asset.label}
                  style={{
                    objectPosition: `${asset.focalX}% ${asset.focalY}%`,
                  }}
                />
                <span>{asset.label}</span>
              </div>

              <strong>{asset.name}</strong>
              <small>
                {asset.width} × {asset.height} ·{formatSize(asset.size)}
              </small>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="asset-empty">
              <ImageIcon size={28} />
              <p>No matching images found.</p>
            </div>
          )}
        </section>

        <aside className="asset-inspector">
          <div className="asset-inspector-title">
            <h2>Asset Inspector</h2>
            <span>Selected</span>
          </div>

          {selected ? (
            <>
              <h3>DYNAMIC CROP & FOCAL POINT</h3>

              <div
                className="asset-preview"
                title="Click to adjust focal point"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();

                  const x = Math.round(
                    ((e.clientX - rect.left) / rect.width) * 100,
                  );

                  const y = Math.round(
                    ((e.clientY - rect.top) / rect.height) * 100,
                  );

                  setFocal({
                    x: Math.min(100, Math.max(0, x)),
                    y: Math.min(100, Math.max(0, y)),
                  });
                }}
              >
                <img
                  src={selected.image}
                  alt={selected.label}
                  style={{
                    objectPosition: `${focal.x}% ${focal.y}%`,
                  }}
                />

                <span
                  className="asset-focal-dot"
                  style={{
                    left: `${focal.x}%`,
                    top: `${focal.y}%`,
                  }}
                />

                <small>Click photo to shift focal point</small>
              </div>

              <div className="asset-focal-coordinates">
                X: {focal.x}% &nbsp; | &nbsp; Y: {focal.y}%
              </div>

              <div className="asset-meta">
                <p>
                  <span>File name</span>
                  {selected.name}
                </p>
                <p>
                  <span>Dimensions</span>
                  {selected.width} × {selected.height}
                </p>
                <p>
                  <span>MIME</span>
                  {selected.mime}
                </p>
                <p>
                  <span>Size</span>
                  {formatSize(selected.size)}
                </p>
                <p>
                  <span>Category</span>
                  {selected.category}
                </p>
                <p>
                  <span>Uploaded</span>
                  {selected.uploadedAt
                    ? new Date(selected.uploadedAt).toLocaleString()
                    : "Bundled demo asset"}
                </p>
              </div>

              <h3>REFERENCED ACROSS CMS</h3>

              <div className="asset-references">
                {selected.references.length ? (
                  selected.references.map((ref, index) => (
                    <div key={index}>{ref}</div>
                  ))
                ) : (
                  <p>No linked CMS references recorded.</p>
                )}
              </div>

              <button className="asset-secondary-btn" onClick={copyImage}>
                <Copy size={15} />
                Copy Image Reference
              </button>

              <button
                className="asset-secondary-btn"
                onClick={() => setFocal({ x: 50, y: 50 })}
              >
                <SlidersHorizontal size={15} />
                Reset Focal Point
              </button>

              <button
                className="asset-orange-btn asset-save"
                onClick={saveFocal}
              >
                <Save size={16} />
                Save Focal Adjustments
              </button>

              <button
                className="asset-delete"
                onClick={removeAsset}
                title="Delete asset"
              >
                <Trash2 size={16} />
                Delete Asset
              </button>
            </>
          ) : (
            <p className="asset-muted">
              Select an image to inspect its details.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
