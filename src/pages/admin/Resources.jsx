import React, { useEffect, useState } from "react";
import {
  getResources,
  addResource,
  updateResource,
  deleteResource
} from "../../data/storage";

const blank = {
  name: "",
  category: "",
  total: 1,
  available: 1
};

function Resources() {
  const [resources, setResources] = useState(getResources);
  const [form, setForm] = useState(blank);

  useEffect(() => {
    const refresh = () => setResources(getResources());
    window.addEventListener("citycare-update", refresh);
    return () => window.removeEventListener("citycare-update", refresh);
  }, []);

  function submit(e) {
    e.preventDefault();

    if (form.available > form.total) {
      alert("Available quantity cannot exceed total quantity.");
      return;
    }

    addResource({
      ...form,
      total: Number(form.total),
      available: Number(form.available)
    });

    setResources(getResources());
    setForm(blank);
  }

  function changeQuantity(resource, field, value) {
    const number = Number(value);

    const updated = {
      ...resource,
      [field]: number
    };

    if (
      updated.total < 0 ||
      updated.available < 0 ||
      updated.available > updated.total
    ) {
      alert("Please enter valid quantities.");
      return;
    }

    updateResource(resource.id, updated);
    setResources(getResources());
  }

  function remove(id) {
    if (!window.confirm("Remove this resource?")) return;
    deleteResource(id);
    setResources(getResources());
  }

  const totalItems = resources.reduce((sum, item) => sum + item.total, 0);
  const availableItems = resources.reduce((sum, item) => sum + item.available, 0);

  return (
    <div className="portal-page admin-theme">
      <h2>Hospital Resource Management</h2>

      <div className="appointment-card">
        <h3>Resource Summary</h3>
        <p>Resource categories: {resources.length}</p>
        <p>Total units: {totalItems}</p>
        <p>Available units: {availableItems}</p>
        <p>Occupied or unavailable: {totalItems - availableItems}</p>
      </div>

      <form className="portal-form" onSubmit={submit}>
        <h3>Add New Resource</h3>

        <label>Resource Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label>Category</label>
        <input
          required
          placeholder="Beds, Equipment, Vehicles..."
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <label>Total Quantity</label>
        <input
          type="number"
          min="0"
          required
          value={form.total}
          onChange={(e) => setForm({ ...form, total: e.target.value })}
        />

        <label>Available Quantity</label>
        <input
          type="number"
          min="0"
          required
          value={form.available}
          onChange={(e) => setForm({ ...form, available: e.target.value })}
        />

        <button type="submit">Add Resource</button>
      </form>

      <h3>Resource Inventory</h3>

      {resources.map((resource) => (
        <div className="appointment-card" key={resource.id}>
          <h3>{resource.name}</h3>
          <p>Category: {resource.category}</p>

          <label>Total: </label>
          <input
            type="number"
            min="0"
            value={resource.total}
            onChange={(e) =>
              changeQuantity(resource, "total", e.target.value)
            }
          />

          <label>Available: </label>
          <input
            type="number"
            min="0"
            value={resource.available}
            onChange={(e) =>
              changeQuantity(resource, "available", e.target.value)
            }
          />

          <p>Occupied or unavailable: {resource.total - resource.available}</p>

          <button
            className="danger-button"
            onClick={() => remove(resource.id)}
          >
            Remove Resource
          </button>
        </div>
      ))}
    </div>
  );
}

export default Resources;