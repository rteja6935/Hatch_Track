import React, { useEffect, useRef, useState } from "react";
import "../CSS/UserDashboard.css";

const SLOT_COUNT = 4;
const LOCK_DAYS = 10; // unused changeable lock value

function humanFileSize(bytes) {
  if (!bytes) return "";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const sizes = ["B", "KB", "MB", "GB"];
  return (bytes / Math.pow(1024, i)).toFixed(i ? 1 : 0) + " " + sizes[i];
}

export default function UserDashboard() {
  // Profile
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  // Slots
  const [slots, setSlots] = useState(
    Array.from({ length: SLOT_COUNT }, () => ({
      file: null,
      previewUrl: null,
      uploadedOn: null,
      progress: 0,
      status: "idle", // idle | uploading | done
    }))
  );

  // interval refs for simulated uploads
  const uploadTimers = useRef({});

  // preview cleanup for profile
  useEffect(() => {
    if (!profileFile) {
      setProfilePreview(null);
      return;
    }
    const url = URL.createObjectURL(profileFile);
    setProfilePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [profileFile]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      // clear timers
      Object.values(uploadTimers.current).forEach((t) => t && clearInterval(t));
      // revoke slot previews
      slots.forEach((s) => {
        if (s.previewUrl) URL.revokeObjectURL(s.previewUrl);
      });
      if (profilePreview) URL.revokeObjectURL(profilePreview);
    };
    // eslint-disable-next-line
  }, []);

  // simulated upload: starts when file is set
  const startSimulatedUpload = (index) => {
    // clear existing if any
    if (uploadTimers.current[index]) {
      clearInterval(uploadTimers.current[index]);
    }
    setSlots((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], status: "uploading", progress: 6 };
      return next;
    });

    uploadTimers.current[index] = setInterval(() => {
      setSlots((prev) => {
        const next = [...prev];
        const s = next[index];
        if (!s) return prev;
        const increment = Math.floor(Math.random() * 12) + 6;
        const newProgress = Math.min(100, (s.progress || 0) + increment);
        if (newProgress >= 100) {
          clearInterval(uploadTimers.current[index]);
          uploadTimers.current[index] = null;
          next[index] = {
            ...s,
            progress: 100,
            status: "done",
            uploadedOn: new Date().toISOString(),
          };
        } else {
          next[index] = { ...s, progress: newProgress };
        }
        return next;
      });
    }, 320);
  };

  // handle profile file selection
  const handleProfileChange = (file) => {
    if (!file) return;
    setProfileFile(file);
    // optionally send to server here
  };

  // handle file selected for a slot (from input or drop)
  const handleSlotFile = (index, file) => {
    if (!file) return;
    // revoke old preview if present
    setSlots((prev) => {
      const next = [...prev];
      const old = next[index];
      if (old && old.previewUrl) URL.revokeObjectURL(old.previewUrl);
      const previewUrl = URL.createObjectURL(file);
      next[index] = {
        file,
        previewUrl,
        uploadedOn: null,
        progress: 0,
        status: "idle",
      };
      return next;
    });
    // small timeout before starting upload gives immediate UI feedback
    setTimeout(() => startSimulatedUpload(index), 120);
  };

  // retake/cancel upload: stop timer, clear file and preview
  const handleRetake = (index) => {
    // stop timer
    if (uploadTimers.current[index]) {
      clearInterval(uploadTimers.current[index]);
      uploadTimers.current[index] = null;
    }
    setSlots((prev) => {
      const next = [...prev];
      const old = next[index];
      if (old && old.previewUrl) URL.revokeObjectURL(old.previewUrl);
      next[index] = {
        file: null,
        previewUrl: null,
        uploadedOn: null,
        progress: 0,
        status: "idle",
      };
      return next;
    });
  };

  // open file input
  const slotFileInputs = useRef([]);
  const openSlotInput = (idx) => {
    slotFileInputs.current[idx] && slotFileInputs.current[idx].click();
  };

  // drag/drop
  const onDrop = (e, idx) => {
    e.preventDefault();
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleSlotFile(idx, f);
  };

  const [viewUrl, setViewUrl] = useState(null);

  return (
    <div className="ud-page">
      <div className="ud-card">
        {/* PROFILE ROW - compact */}
        <div className="ud-row profile-row">
          <div className="profile-left">
            <div className="avatar-large">
              {profilePreview ? (
                <img src={profilePreview} alt="profile" />
              ) : (
                <div className="avatar-initials">RK</div>
              )}
            </div>

            <div className="profile-data">
              <div className="name">Ramesh Kumar</div>
              <div className="meta">ID: <span className="meta-strong">USER12345</span> • +91 9876543210</div>
              <div className="meta">ramesh@example.com</div>
            </div>
          </div>

          <div className="profile-actions-compact">
            <input
              id="profile-file-compact"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleProfileChange(e.target.files?.[0] || null)}
            />
            <label htmlFor="profile-file-compact" className="btn primary large">
              Change Profile
            </label>
            <button
              className="btn ghost large"
              onClick={() => {
                setProfileFile(null);
              }}
              disabled={!profileFile}
            >
              Remove
            </button>
          </div>
        </div>

        {/* SEED SUMMARY - compact row */}
        <div className="ud-row seed-row">
          <div className="seed-pill">
            <div className="seed-number">500</div>
            <div className="seed-label">Total</div>
          </div>
          <div className="seed-pill">
            <div className="seed-number">400</div>
            <div className="seed-label">Planted</div>
          </div>
          <div className="seed-pill">
            <div className="seed-number">100</div>
            <div className="seed-label">Remaining</div>
          </div>
        </div>

        {/* GROWTH SLOT GRID */}
        <div className="ud-row growth-row">
          <h3 className="section-title">Growth Progress</h3>

          <div className="slots-grid">
            {slots.map((s, idx) => (
              <div
                key={idx}
                className="slot"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, idx)}
              >
                <div className="slot-preview">
                  {s.previewUrl ? (
                    <img src={s.previewUrl} alt={`slot-${idx}`} onClick={() => setViewUrl(s.previewUrl)} />
                  ) : (
                    <div className="slot-placeholder">Slot {idx + 1}</div>
                  )}
                </div>

                <div className="slot-controls">
                  <input
                    ref={(el) => (slotFileInputs.current[idx] = el)}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleSlotFile(idx, f);
                      e.target.value = "";
                    }}
                  />

                  {/* Upload / Retake / View */}
                  <div className="slot-actions">
                    {s.status === "uploading" ? (
                      <>
                        <div className="progress-box">
                          <div className="progress-bar" style={{ width: `${s.progress}%` }} />
                        </div>
                        <button className="btn ghost small" onClick={() => handleRetake(idx)}>
                          Retake
                        </button>
                      </>
                    ) : s.status === "done" ? (
                      <>
                        <div className="done-badge">Uploaded</div>
                        <button className="btn small" onClick={() => openSlotInput(idx)}>
                          Retake
                        </button>
                        <button className="btn ghost small" onClick={() => setViewUrl(s.previewUrl)}>
                          View
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="btn small" onClick={() => openSlotInput(idx)}>
                          Upload
                        </button>
                      </>
                    )}
                  </div>

                  {/* footer meta */}
                  <div className="slot-meta">
                    <div className="meta-left">{s.file ? humanFileSize(s.file.size) : ""}</div>
                    <div className="meta-right">{s.uploadedOn ? new Date(s.uploadedOn).toLocaleDateString() : ""}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image viewer */}
      {viewUrl && (
        <div className="viewer" onClick={() => setViewUrl(null)}>
          <div className="viewer-inner" onClick={(e) => e.stopPropagation()}>
            <img src={viewUrl} alt="view" />
            <button className="btn ghost close" onClick={() => setViewUrl(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
