import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  Search,
  ArrowUp,
  ArrowDown,
  Check,
  X,
} from "lucide-react";

import { initialChefs } from "../data/adminData";

const loadChefs = () => {
  try {
    const saved = localStorage.getItem("restaurant-chefs");
    return saved ? JSON.parse(saved) : initialChefs;
  } catch {
    return initialChefs;
  }
};

const createEmptyChef = () => ({
  id: `EG-C${Date.now()}`,
  name: "",
  title: "",
  bio: "",
  specialties: [],
  image: "",
  published: true,
});

export default function ChefManagement() {
  const [chefs, setChefs] = useState(loadChefs);
  const [selected, setSelected] = useState("EG-C001");
  const [draft, setDraft] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Published");
  const [specialty, setSpecialty] = useState("");

  useEffect(() => {
    localStorage.setItem("restaurant-chefs", JSON.stringify(chefs));
  }, [chefs]);

  useEffect(() => {
    if (selected) {
      const chef = chefs.find((c) => c.id === selected);
      if (chef) setDraft({ ...chef });
    }
  }, [selected]);

  const visibleChefs = useMemo(() => {
    return chefs.filter((chef) => {
      const term = search.toLowerCase();

      const matchesSearch =
        chef.name.toLowerCase().includes(term) ||
        chef.title.toLowerCase().includes(term) ||
        chef.specialties.some((s) => s.toLowerCase().includes(term));

      const matchesFilter =
        filter === "All profiles" ||
        (filter === "Published" && chef.published) ||
        (filter === "Unpublished" && !chef.published);

      return matchesSearch && matchesFilter;
    });
  }, [chefs, search, filter]);

  const publishedCount = chefs.filter((c) => c.published).length;

  const specialtyCount = new Set(chefs.flatMap((c) => c.specialties)).size;

  const chooseChef = (chef) => {
    setSelected(chef.id);
    setDraft({ ...chef });
    setSpecialty("");
  };

  const addChef = () => {
    setSelected(null);
    setDraft(createEmptyChef());
    setSpecialty("");
  };

  const updateDraft = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChef = (e) => {
    e.preventDefault();

    if (!draft.name.trim() || !draft.title.trim() || !draft.bio.trim()) {
      return;
    }

    if (draft.specialties.length === 0) {
      alert("Please add at least one specialty.");
      return;
    }

    setChefs((previous) => {
      const exists = previous.some((c) => c.id === draft.id);

      return exists
        ? previous.map((c) => (c.id === draft.id ? draft : c))
        : [...previous, draft];
    });

    setSelected(draft.id);
  };

  const deleteChef = (id) => {
    if (!window.confirm("Delete this chef profile?")) return;

    setChefs((previous) => previous.filter((c) => c.id !== id));

    if (draft?.id === id) {
      setDraft(null);
      setSelected(null);
    }
  };

  const moveChef = (id, direction) => {
    setChefs((previous) => {
      const updated = [...previous];
      const index = updated.findIndex((c) => c.id === id);
      const target = index + direction;

      if (index < 0 || target < 0 || target >= updated.length) {
        return previous;
      }

      [updated[index], updated[target]] = [updated[target], updated[index]];

      return updated;
    });
  };

  const addSpecialty = () => {
    const value = specialty.trim();
    if (!value || !draft) return;

    if (draft.specialties.some((s) => s.toLowerCase() === value.toLowerCase()))
      return;

    updateDraft("specialties", [...draft.specialties, value]);

    setSpecialty("");
  };

  const removeSpecialty = (name) => {
    updateDraft(
      "specialties",
      draft.specialties.filter((s) => s !== name),
    );
  };

  const uploadImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      alert("Please upload a JPG, PNG or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateDraft("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="management-page">
      <div className="admin-page-heading">
        <div>
          <h1>Chef management</h1>
          <p>
            The people behind the hearth. Curate profiles and their order on the
            website.
          </p>
        </div>

        <button className="admin-orange-btn" onClick={addChef}>
          Add chef profile <Plus size={17} />
        </button>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <span>CHEF PROFILES</span>
          <div>
            <strong>{String(chefs.length).padStart(2, "0")}</strong>
            <small>Our kitchen team</small>
          </div>
        </div>

        <div className="admin-stat">
          <span>PUBLISHED</span>
          <div>
            <strong>
              {String(publishedCount).padStart(2, "0")} /{" "}
              {String(chefs.length).padStart(2, "0")}
            </strong>
            <small>Visible on website</small>
          </div>
        </div>

        <div className="admin-stat">
          <span>CUISINE SPECIALTIES</span>
          <div>
            <strong>{String(specialtyCount).padStart(2, "0")}</strong>
            <small>Distinct areas of expertise</small>
          </div>
        </div>
      </div>

      <div className="admin-management-grid">
        <div className="admin-left-column">
          <div className="admin-panel-heading outside-heading">
            <h2>Our kitchen team</h2>
            <small>{visibleChefs.length} profiles</small>
          </div>

          <div className="admin-toolbar chef-toolbar">
            <div className="admin-search">
              <Search size={17} />
              <input
                placeholder="Search chef name or specialty"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option>All profiles</option>
              <option>Published</option>
              <option>Unpublished</option>
            </select>
          </div>

          <div className="admin-chef-list">
            {visibleChefs.map((chef) => {
              const index = chefs.findIndex((c) => c.id === chef.id);

              return (
                <article className="admin-panel chef-card" key={chef.id}>
                  <div className="chef-card-main">
                    {chef.image ? (
                      <img src={chef.image} alt={chef.name} />
                    ) : (
                      <div className="chef-no-photo">No photo</div>
                    )}

                    <div className="chef-card-info">
                      <div className="chef-card-title">
                        <h3>{chef.name}</h3>
                        <span className="admin-small-badge">
                          {chef.published ? "Published" : "Draft"}
                        </span>
                      </div>

                      <small className="chef-designation">
                        {chef.title.toUpperCase()}
                      </small>

                      <p>{chef.bio}</p>

                      <div className="chef-tags">
                        {chef.specialties.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="chef-card-actions">
                    <span className="chef-position">
                      ⠿ &nbsp; Position {index + 1}
                    </span>

                    <button
                      title="Move up"
                      disabled={index === 0}
                      onClick={() => moveChef(chef.id, -1)}
                    >
                      <ArrowUp size={15} />
                    </button>

                    <button
                      title="Move down"
                      disabled={index === chefs.length - 1}
                      onClick={() => moveChef(chef.id, 1)}
                    >
                      <ArrowDown size={15} />
                    </button>

                    <div className="chef-card-action-spacer" />

                    <button
                      className="chef-edit-btn"
                      onClick={() => chooseChef(chef)}
                    >
                      Edit profile <Pencil size={15} />
                    </button>

                    <button
                      className="chef-delete-btn"
                      onClick={() => deleteChef(chef.id)}
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </article>
              );
            })}

            {visibleChefs.length === 0 && (
              <div className="admin-panel admin-no-results">
                No matching chef profiles.
              </div>
            )}
          </div>

          <div className="admin-panel admin-help-card">
            <strong>A considered introduction</strong>
            <p>
              Use the arrows to reorder the team. The saved order can also be
              used on Chef Details.
            </p>
          </div>
        </div>

        <div className="admin-right-column">
          <section className="admin-panel edit-panel">
            {draft ? (
              <form onSubmit={saveChef}>
                <div className="admin-panel-heading">
                  <h2>{selected ? "Edit chef profile" : "Add chef profile"}</h2>
                  <span className="admin-small-badge">
                    {selected ? "Editing" : "New"}
                  </span>
                </div>

                <p className="admin-edit-subtitle">
                  {draft.name || "New chef"} · Profile {draft.id}
                </p>

                <div className="admin-field">
                  <label>Profile photo</label>

                  <div className="chef-photo-editor">
                    {draft.image ? (
                      <img src={draft.image} alt="Chef profile" />
                    ) : (
                      <div className="chef-no-photo">No photo</div>
                    )}

                    <div>
                      <small>Profile image</small>

                      <label className="admin-upload-button">
                        Upload / replace <Upload size={15} />
                        <input
                          type="file"
                          hidden
                          accept="image/png,image/jpeg,image/webp"
                          onChange={uploadImage}
                        />
                      </label>

                      <button
                        className="admin-delete-link"
                        type="button"
                        onClick={() => updateDraft("image", "")}
                      >
                        Delete photo
                      </button>
                    </div>
                  </div>
                </div>

                <div className="admin-field">
                  <label>Full name *</label>
                  <input
                    required
                    value={draft.name}
                    onChange={(e) => updateDraft("name", e.target.value)}
                  />
                </div>

                <div className="admin-field">
                  <label>Title / designation *</label>
                  <input
                    required
                    value={draft.title}
                    onChange={(e) => updateDraft("title", e.target.value)}
                  />
                </div>

                <div className="admin-field">
                  <label>Short bio *</label>
                  <textarea
                    rows="4"
                    maxLength="300"
                    required
                    value={draft.bio}
                    onChange={(e) => updateDraft("bio", e.target.value)}
                  />

                  <small className="admin-field-hint">
                    {draft.bio.length} / 300 characters · Keep it warm and
                    personal.
                  </small>
                </div>

                <div className="admin-field">
                  <label>Specialties / cuisine expertise *</label>

                  <div className="chef-tags editable-tags">
                    {draft.specialties.map((s) => (
                      <span key={s}>
                        {s}
                        <button
                          type="button"
                          onClick={() => removeSpecialty(s)}
                        >
                          <X size={13} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="admin-specialty-input">
                    <input
                      value={specialty}
                      placeholder="Add a cuisine or specialty"
                      onChange={(e) => setSpecialty(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSpecialty();
                        }
                      }}
                    />

                    <button type="button" onClick={addSpecialty}>
                      Add <Plus size={15} />
                    </button>
                  </div>
                </div>

                <div className="admin-field">
                  <label>Display position</label>
                  <select
                    value={
                      selected
                        ? chefs.findIndex((c) => c.id === selected) + 1
                        : chefs.length + 1
                    }
                    onChange={(e) => {
                      const position = Number(e.target.value) - 1;

                      if (!selected) return;

                      setChefs((previous) => {
                        const updated = [...previous];
                        const oldIndex = updated.findIndex(
                          (c) => c.id === selected,
                        );

                        if (oldIndex < 0) return previous;

                        const [item] = updated.splice(oldIndex, 1);
                        updated.splice(position, 0, item);
                        return updated;
                      });
                    }}
                    disabled={!selected}
                  >
                    {chefs.map((c, i) => (
                      <option key={c.id} value={i + 1}>
                        {i + 1} — {c.name}
                      </option>
                    ))}

                    {!selected && (
                      <option value={chefs.length + 1}>
                        {chefs.length + 1} — Last profile
                      </option>
                    )}
                  </select>
                </div>

                <div className="admin-toggle-row">
                  <div>
                    <strong>Published on website</strong>
                    <small>Show this profile on Chef Details.</small>
                  </div>

                  <label className="admin-switch">
                    <input
                      type="checkbox"
                      checked={draft.published}
                      onChange={(e) =>
                        updateDraft("published", e.target.checked)
                      }
                    />
                    <span />
                  </label>
                </div>

                <div className="admin-form-actions">
                  <button type="submit" className="admin-orange-btn">
                    Save changes <Check size={16} />
                  </button>

                  <button
                    type="button"
                    className="admin-outline-btn"
                    onClick={() => {
                      setDraft(null);
                      setSelected(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>

                {selected && (
                  <button
                    type="button"
                    className="admin-delete-link"
                    onClick={() => deleteChef(draft.id)}
                  >
                    Delete this chef profile
                  </button>
                )}
              </form>
            ) : (
              <div className="admin-empty-editor">
                Select a chef profile or add a new chef.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
