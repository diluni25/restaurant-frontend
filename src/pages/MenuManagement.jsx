import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  Search,
  Check,
  X,
  ChevronDown,
} from "lucide-react";

import { initialMenu, initialCategories } from "../data/adminData";

const loadSaved = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const emptyMenuItem = () => ({
  id: `EG-M${Date.now()}`,
  name: "",
  description: "",
  category: "Starters",
  price: "",
  label: "None",
  image: "",
  published: true,
});

export default function MenuManagement() {
  const [menu, setMenu] = useState(() =>
    loadSaved("restaurant-menu", initialMenu),
  );

  const [categories, setCategories] = useState(() =>
    loadSaved("restaurant-categories", initialCategories),
  );

  const [selected, setSelected] = useState("EG-M003");
  const [draft, setDraft] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All categories");
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    localStorage.setItem("restaurant-menu", JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    localStorage.setItem("restaurant-categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (selected !== null) {
      const item = menu.find((m) => m.id === selected);
      if (item) setDraft({ ...item });
    }
  }, [selected]);

  const filtered = useMemo(() => {
    return menu.filter((item) => {
      const term = search.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term);

      const matchesCategory =
        filter === "All categories" || item.category === filter;

      return matchesSearch && matchesCategory;
    });
  }, [menu, search, filter]);

  const choose = (item) => {
    setSelected(item.id);
    setDraft({ ...item });
  };

  const addItem = () => {
    setSelected(null);
    setDraft(emptyMenuItem());
  };

  const updateDraft = (field, value) => {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveItem = (event) => {
    event.preventDefault();

    if (!draft.name.trim() || !draft.description.trim()) {
      return;
    }

    if (Number(draft.price) <= 0) {
      alert("Enter a valid price.");
      return;
    }

    const updated = {
      ...draft,
      price: Number(draft.price),
    };

    setMenu((previous) => {
      const exists = previous.some((item) => item.id === updated.id);
      return exists
        ? previous.map((item) => (item.id === updated.id ? updated : item))
        : [...previous, updated];
    });

    setSelected(updated.id);
    setDraft(updated);
  };

  const deleteItem = (id) => {
    if (!window.confirm("Delete this menu item?")) return;

    setMenu((previous) => previous.filter((item) => item.id !== id));

    if (draft?.id === id) {
      setSelected(null);
      setDraft(null);
    }
  };

  const uploadImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Please upload a JPG, PNG or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum image size is 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateDraft("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const addCategory = () => {
    const name = newCategory.trim();
    if (!name) return;

    if (categories.some((c) => c.toLowerCase() === name.toLowerCase())) {
      alert("Category already exists.");
      return;
    }

    setCategories((previous) => [...previous, name]);
    setNewCategory("");
  };

  const renameCategory = (oldName) => {
    const newName = window.prompt("New category name", oldName)?.trim();
    if (!newName || newName === oldName) return;

    if (categories.includes(newName)) {
      alert("Category already exists.");
      return;
    }

    setCategories((previous) =>
      previous.map((c) => (c === oldName ? newName : c)),
    );

    setMenu((previous) =>
      previous.map((item) => ({
        ...item,
        category: item.category === oldName ? newName : item.category,
      })),
    );

    setDraft((previous) =>
      previous?.category === oldName
        ? { ...previous, category: newName }
        : previous,
    );
  };

  const deleteCategory = (name) => {
    if (menu.some((item) => item.category === name)) {
      alert("Move or delete the items in this category first.");
      return;
    }

    if (!window.confirm(`Delete "${name}"?`)) return;

    setCategories((previous) => previous.filter((c) => c !== name));
  };

  const published = menu.filter((item) => item.published).length;
  const images = menu.filter((item) => item.image).length;

  return (
    <div className="management-page">
      <div className="admin-page-heading">
        <div>
          <h1>Menu management</h1>
          <p>
            Keep the seasonal menu fresh. Manage dishes, categories and
            photography.
          </p>
        </div>

        <button className="admin-orange-btn" onClick={addItem}>
          Add menu item <Plus size={17} />
        </button>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <span>MENU ITEMS</span>
          <div>
            <strong>{String(menu.length).padStart(2, "0")}</strong>
            <small>{published} published</small>
          </div>
        </div>

        <div className="admin-stat">
          <span>CATEGORIES</span>
          <div>
            <strong>{String(categories.length).padStart(2, "0")}</strong>
            <small>Seasonal collection</small>
          </div>
        </div>

        <div className="admin-stat">
          <span>ITEM PHOTOS</span>
          <div>
            <strong>
              {images} / {menu.length}
            </strong>
            <small>Uploaded photos</small>
          </div>
        </div>
      </div>

      <div className="admin-management-grid">
        <div className="admin-left-column">
          <section className="admin-panel menu-table-panel">
            <div className="admin-panel-heading">
              <h2>Seasonal menu</h2>
              <small>{menu.length} items · Autumn 2026</small>
            </div>

            <div className="admin-toolbar">
              <div className="admin-search">
                <Search size={17} />
                <input
                  placeholder="Search name or description"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All categories</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="menu-table-scroll">
              <table className="admin-menu-table">
                <thead>
                  <tr>
                    <th>DISH / DESCRIPTION</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((item) => (
                    <tr
                      key={item.id}
                      className={selected === item.id ? "selected" : ""}
                    >
                      <td>
                        <div className="admin-menu-cell">
                          {item.image ? (
                            <img src={item.image} alt={item.name} />
                          ) : (
                            <div className="admin-image-placeholder">Photo</div>
                          )}

                          <div>
                            <strong>{item.name}</strong>
                            <p>{item.description}</p>
                            {!item.published && (
                              <small className="admin-unpublished">
                                Unpublished
                              </small>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="muted-cell">{item.category}</td>

                      <td>${Number(item.price).toFixed(2)}</td>

                      <td>
                        <div className="admin-table-actions">
                          <button title="Edit" onClick={() => choose(item)}>
                            <Pencil size={15} />
                          </button>

                          <button
                            title="Delete"
                            onClick={() => deleteItem(item.id)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <p className="admin-no-results">No menu items found.</p>
              )}
            </div>

            <div className="admin-panel-footer">
              <span>Showing {filtered.length} menu items</span>
              <span>Saved locally</span>
            </div>
          </section>

          <section className="admin-panel category-panel">
            <div className="admin-panel-heading">
              <h2>Menu categories</h2>
              <small>{categories.length} categories</small>
            </div>

            {categories.map((category) => (
              <div className="category-row" key={category}>
                <span>⠿ &nbsp; {category}</span>

                <div>
                  <small>
                    {menu.filter((m) => m.category === category).length} items
                  </small>

                  <button onClick={() => renameCategory(category)}>
                    <Pencil size={14} />
                  </button>

                  <button onClick={() => deleteCategory(category)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}

            <div className="admin-add-category">
              <input
                placeholder="New category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addCategory();
                }}
              />

              <button onClick={addCategory}>
                Add category <Plus size={15} />
              </button>
            </div>
          </section>
        </div>

        <div className="admin-right-column">
          <section className="admin-panel edit-panel">
            {draft ? (
              <form onSubmit={saveItem}>
                <div className="admin-panel-heading">
                  <h2>{selected ? "Edit menu item" : "Add menu item"}</h2>
                  <span className="admin-small-badge">
                    {selected ? "Editing" : "New"}
                  </span>
                </div>

                <p className="admin-edit-subtitle">
                  {draft.name || "New dish"} · Item {draft.id}
                </p>

                <div className="admin-field">
                  <label>Dish name *</label>
                  <input
                    required
                    value={draft.name}
                    onChange={(e) => updateDraft("name", e.target.value)}
                  />
                </div>

                <div className="admin-form-grid">
                  <div className="admin-field">
                    <label>Category *</label>
                    <select
                      value={draft.category}
                      onChange={(e) => updateDraft("category", e.target.value)}
                    >
                      {categories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-field">
                    <label>Price (USD) *</label>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      required
                      value={draft.price}
                      onChange={(e) => updateDraft("price", e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-field">
                  <label>Description *</label>
                  <textarea
                    required
                    rows="4"
                    value={draft.description}
                    onChange={(e) => updateDraft("description", e.target.value)}
                  />
                </div>

                <div className="admin-field">
                  <label>Dietary / menu label</label>
                  <select
                    value={draft.label}
                    onChange={(e) => updateDraft("label", e.target.value)}
                  >
                    {[
                      "None",
                      "House favorite",
                      "Vegetarian",
                      "Vegan",
                      "Gluten free",
                      "Freshly baked",
                    ].map((label) => (
                      <option key={label}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-field">
                  <label>Item image</label>

                  {draft.image ? (
                    <img
                      className="admin-edit-image"
                      src={draft.image}
                      alt="Dish preview"
                    />
                  ) : (
                    <div className="admin-edit-image admin-empty-photo">
                      No image selected
                    </div>
                  )}

                  <div className="admin-image-buttons">
                    <label className="admin-upload-button">
                      Upload / replace <Upload size={15} />
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        hidden
                        onChange={uploadImage}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => updateDraft("image", "")}
                    >
                      Delete image <Trash2 size={14} />
                    </button>
                  </div>

                  <small className="admin-field-hint">
                    JPG, PNG or WebP · Up to 5 MB
                  </small>
                </div>

                <div className="admin-toggle-row">
                  <div>
                    <strong>Visible on menu</strong>
                    <small>Customers can order this dish.</small>
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
                  <button className="admin-orange-btn" type="submit">
                    Save changes <Check size={17} />
                  </button>

                  <button
                    className="admin-outline-btn"
                    type="button"
                    onClick={() => {
                      setSelected(null);
                      setDraft(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>

                {selected && (
                  <button
                    className="admin-delete-link"
                    type="button"
                    onClick={() => deleteItem(draft.id)}
                  >
                    Delete this menu item
                  </button>
                )}
              </form>
            ) : (
              <div className="admin-empty-editor">
                Select a dish to edit or add a new item.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
