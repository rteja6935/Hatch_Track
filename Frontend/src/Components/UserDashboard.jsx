import React, { useEffect, useRef, useState } from "react";

const SLOT_COUNT = 4;

function humanFileSize(bytes) {
  if (!bytes) return "";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const sizes = ["B", "KB", "MB", "GB"];
  return (bytes / Math.pow(1024, i)).toFixed(i ? 1 : 0) + " " + sizes[i];
}

export default function UserDashboard() {
  // profile
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Ramesh Kumar",
    id: "USER12345",
    phone: "+91 9876543210",
    email: "ramesh@example.com"
  });

  // slot shape: { file, previewUrl, status: 'idle'|'selected'|'uploading'|'done', progress, uploadedOn }
  const [slots, setSlots] = useState(
    Array.from({ length: SLOT_COUNT }, () => ({
      file: null,
      previewUrl: null,
      status: "idle",
      progress: 0,
      uploadedOn: null,
    }))
  );

  // timers for simulated upload
  const uploadTimers = useRef({});

  // file input refs
  const slotFileInputs = useRef([]);

  // view modal
  const [viewUrl, setViewUrl] = useState(null);

  // profile preview effect
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
      Object.values(uploadTimers.current).forEach((t) => t && clearInterval(t));
      slots.forEach((s) => s.previewUrl && URL.revokeObjectURL(s.previewUrl));
      profilePreview && URL.revokeObjectURL(profilePreview);
    };
  }, []);

  // --- simulated upload (start only when user confirms) ---
  const startSimulatedUpload = (index) => {
    // ensure previous timer cleared
    if (uploadTimers.current[index]) {
      clearInterval(uploadTimers.current[index]);
      uploadTimers.current[index] = null;
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
        const inc = Math.floor(Math.random() * 12) + 6;
        const newP = Math.min(100, (s.progress || 0) + inc);
        if (newP >= 100) {
          clearInterval(uploadTimers.current[index]);
          uploadTimers.current[index] = null;
          next[index] = {
            ...s,
            progress: 100,
            status: "done",
            uploadedOn: new Date().toISOString(),
          };
        } else {
          next[index] = { ...s, progress: newP };
        }
        return next;
      });
    }, 320);
  };

  // when user selects a file (but hasn't confirmed upload)
  const handleSlotSelect = (index, file) => {
    if (!file) return;
    setSlots((prev) => {
      const next = [...prev];
      // revoke old preview
      if (next[index].previewUrl) URL.revokeObjectURL(next[index].previewUrl);
      const previewUrl = URL.createObjectURL(file);
      next[index] = {
        file,
        previewUrl,
        status: "selected",
        progress: 0,
        uploadedOn: null,
      };
      return next;
    });
  };

  // confirm upload (user action) -> start simulated upload
  const confirmUpload = (index) => {
    const s = slots[index];
    if (!s || !s.file) return alert("No file selected.");
    startSimulatedUpload(index);
  };

  // retake: clear slot and cancel upload if any, then open file picker
  const retake = (index) => {
    // cancel timer
    if (uploadTimers.current[index]) {
      clearInterval(uploadTimers.current[index]);
      uploadTimers.current[index] = null;
    }
    setSlots((prev) => {
      const next = [...prev];
      const old = next[index];
      if (old && old.previewUrl) URL.revokeObjectURL(old.previewUrl);
      next[index] = { file: null, previewUrl: null, status: "idle", progress: 0, uploadedOn: null };
      return next;
    });
    // open file picker after small delay to ensure state cleared
    setTimeout(() => slotFileInputs.current[index] && slotFileInputs.current[index].click(), 120);
  };

  // delete: confirm then clear (works in selected/uploading/done states)
  const handleDelete = (index) => {
    const confirmMsg = "Are you sure you want to delete this image?";
    if (!window.confirm(confirmMsg)) return;
    // cancel timer
    if (uploadTimers.current[index]) {
      clearInterval(uploadTimers.current[index]);
      uploadTimers.current[index] = null;
    }
    setSlots((prev) => {
      const next = [...prev];
      const old = next[index];
      if (old && old.previewUrl) URL.revokeObjectURL(old.previewUrl);
      next[index] = { file: null, previewUrl: null, status: "idle", progress: 0, uploadedOn: null };
      return next;
    });
  };

  // open file picker
  const openSlotInput = (index) => {
    slotFileInputs.current[index] && slotFileInputs.current[index].click();
  };

  // profile handlers
  const handleProfileChange = (file) => setProfileFile(file);
  const removeProfile = () => setProfileFile(null);
  const handleProfileDataChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };
  const saveProfileChanges = () => {
    setIsEditingProfile(false);
    // Here you would typically save to backend
  };
  const cancelProfileEdit = () => {
    setIsEditingProfile(false);
    // Reset to original data if needed
  };

  // drop handler
  const onDrop = (e, idx) => {
    e.preventDefault();
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleSlotSelect(idx, f);
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>🥚 HatchTrack</div>
      </div>
      
      <div style={styles.card}>
        {/* PROFILE ROW */}
        <div style={styles.profileRow}>
          <div style={styles.profileLeft}>
            <div style={styles.avatarLarge}>
              {profilePreview ? (
                <img src={profilePreview} alt="profile" style={styles.avatarImg} />
              ) : (
                <div style={styles.avatarInitials}>RK</div>
              )}
            </div>
            <div style={styles.profileData}>
              {isEditingProfile ? (
                <>
                  <input 
                    type="text" 
                    style={{...styles.editInput, ...styles.nameInput}}
                    value={profileData.name}
                    onChange={(e) => handleProfileDataChange('name', e.target.value)}
                    placeholder="Full Name"
                  />
                  <input 
                    type="text" 
                    style={styles.editInput}
                    value={profileData.phone}
                    onChange={(e) => handleProfileDataChange('phone', e.target.value)}
                    placeholder="Phone Number"
                  />
                  <input 
                    type="email" 
                    style={styles.editInput}
                    value={profileData.email}
                    onChange={(e) => handleProfileDataChange('email', e.target.value)}
                    placeholder="Email"
                  />
                </>
              ) : (
                <>
                  <div style={styles.name}>{profileData.name}</div>
                  <div style={styles.meta}>
                    ID: <span style={styles.metaStrong}>{profileData.id}</span> • {profileData.phone}
                  </div>
                  <div style={styles.meta}>{profileData.email}</div>
                </>
              )}
            </div>
          </div>
          <div style={styles.profileActions}>
            {isEditingProfile ? (
              <>
                <button style={{...styles.btn, ...styles.btnPrimary, ...styles.btnLarge}} onClick={saveProfileChanges}>
                  Save Changes
                </button>
                <button style={{...styles.btn, ...styles.btnGhost, ...styles.btnLarge}} onClick={cancelProfileEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button style={{...styles.btn, ...styles.btnPrimary, ...styles.btnLarge}} onClick={() => setIsEditingProfile(true)}>
                  Edit Profile
                </button>
                <input
                  id="profile-file-compact"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleProfileChange(e.target.files?.[0] || null)}
                />
                <label htmlFor="profile-file-compact" style={{...styles.btn, ...styles.btnGhost, ...styles.btnLarge, cursor: 'pointer'}}>
                  Change Photo
                </label>
                {profileFile && (
                  <button style={{...styles.btn, ...styles.btnGhost, ...styles.btnLarge}} onClick={removeProfile}>
                    Remove Photo
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* SEED SUMMARY */}
        <div style={styles.seedRow}>
          <div style={styles.seedPill}>
            <div style={styles.seedNumber}>500</div>
            <div style={styles.seedLabel}>Total</div>
          </div>
          <div style={styles.seedPill}>
            <div style={styles.seedNumber}>400</div>
            <div style={styles.seedLabel}>Planted</div>
          </div>
          <div style={styles.seedPill}>
            <div style={styles.seedNumber}>100</div>
            <div style={styles.seedLabel}>Remaining</div>
          </div>
        </div>

        {/* GROWTH SLOTS */}
        <div style={styles.growthRow}>
          <h3 style={styles.sectionTitle}>Growth Progress</h3>
          <div style={styles.slotsGrid}>
            {slots.map((s, idx) => (
              <div
                key={idx}
                style={styles.slot}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, idx)}
              >
                <div style={styles.slotPreview}>
                  {s.previewUrl ? (
                    <img 
                      src={s.previewUrl} 
                      alt={`slot-${idx}`} 
                      onClick={() => setViewUrl(s.previewUrl)}
                      style={styles.slotImg}
                    />
                  ) : (
                    <div style={styles.slotPlaceholder}>Slot {idx + 1}</div>
                  )}
                </div>

                <div style={styles.slotControls}>
                  {/* hidden file input */}
                  <input
                    ref={(el) => (slotFileInputs.current[idx] = el)}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleSlotSelect(idx, f);
                      e.target.value = "";
                    }}
                  />

                  <div style={styles.slotActions}>
                    {s.status === "idle" && (
                      <button style={{...styles.btn, ...styles.btnSmall}} onClick={() => openSlotInput(idx)}>
                        Upload
                      </button>
                    )}

                    {s.status === "selected" && (
                      <>
                        <button style={{...styles.btn, ...styles.btnSmall}} onClick={() => confirmUpload(idx)}>
                          Confirm Upload
                        </button>
                        <button style={{...styles.btn, ...styles.btnGhost, ...styles.btnSmall}} onClick={() => openSlotInput(idx)}>
                          Retake
                        </button>
                        {s.previewUrl && (
                          <button style={{...styles.btn, ...styles.btnGhost, ...styles.btnSmall}} onClick={() => setViewUrl(s.previewUrl)}>
                            View
                          </button>
                        )}
                        <button style={{...styles.btn, ...styles.btnDanger, ...styles.btnSmall}} onClick={() => handleDelete(idx)}>
                          Delete
                        </button>
                      </>
                    )}

                    {s.status === "uploading" && (
                      <>
                        <div style={styles.progressBox} title={`${Math.round(s.progress)}%`}>
                          <div style={{...styles.progressBar, width: `${s.progress}%`}} />
                        </div>
                        <button style={{...styles.btn, ...styles.btnGhost, ...styles.btnSmall}} onClick={() => retake(idx)}>
                          Retake
                        </button>
                        <button style={{...styles.btn, ...styles.btnDanger, ...styles.btnSmall}} onClick={() => handleDelete(idx)}>
                          Delete
                        </button>
                      </>
                    )}

                    {s.status === "done" && (
                      <>
                        <div style={styles.doneBadge}>Uploaded</div>
                        <button style={{...styles.btn, ...styles.btnSmall, ...styles.btnDisabled}} disabled title="Retake disabled after upload">
                          Retake
                        </button>
                        <button style={{...styles.btn, ...styles.btnGhost, ...styles.btnSmall}} onClick={() => setViewUrl(s.previewUrl)}>
                          View
                        </button>
                        <button style={{...styles.btn, ...styles.btnDanger, ...styles.btnSmall}} onClick={() => handleDelete(idx)}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>

                  <div style={styles.slotMeta}>
                    <div style={styles.metaLeft}>{s.file ? humanFileSize(s.file.size) : ""}</div>
                    <div style={styles.metaRight}>{s.uploadedOn ? new Date(s.uploadedOn).toLocaleDateString() : ""}</div>
                  </div>

                  {/* Inline success message when done */}
                  {s.status === "done" && (
                    <div style={styles.successRow}>
                      <span style={styles.check}>✓</span>
                      <span style={styles.successText}>Image uploaded successfully</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* viewer modal */}
      {viewUrl && (
        <div style={styles.viewer} onClick={() => setViewUrl(null)}>
          <div style={styles.viewerInner} onClick={(e) => e.stopPropagation()}>
            <img src={viewUrl} alt="view" style={styles.viewerImg} />
            <button style={{...styles.btn, ...styles.btnGhost, ...styles.closeBtn}} onClick={() => setViewUrl(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    padding: '1.5rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    letterSpacing: '-0.5px',
  },
  card: {
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '2rem',
  },
  profileRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid #e2e8f0',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  profileLeft: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  avatarLarge: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
    background: '#667eea',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarInitials: {
    color: 'white',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  profileData: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  name: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#1e293b',
  },
  meta: {
    fontSize: '0.95rem',
    color: '#64748b',
  },
  metaStrong: {
    fontWeight: 600,
    color: '#475569',
  },
  profileActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    alignItems: 'center',
  },
  editInput: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    marginBottom: '0.5rem',
    border: '2px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
  },
  nameInput: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
  },
  seedRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  seedPill: {
    flex: 1,
    minWidth: '150px',
    padding: '1.5rem',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(251, 191, 36, 0.3)',
  },
  seedNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  seedLabel: {
    fontSize: '0.9rem',
    opacity: 0.9,
  },
  growthRow: {
    marginTop: '2rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '1.5rem',
  },
  slotsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  slot: {
    border: '2px dashed #cbd5e1',
    borderRadius: '12px',
    padding: '1rem',
    background: '#f8fafc',
    transition: 'all 0.2s',
  },
  slotPreview: {
    width: '100%',
    height: '200px',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '1rem',
    background: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  slotPlaceholder: {
    color: '#94a3b8',
    fontSize: '1rem',
    fontWeight: 500,
  },
  slotControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  slotActions: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  slotMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
    color: '#64748b',
  },
  metaLeft: {},
  metaRight: {},
  successRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    background: '#dcfce7',
    borderRadius: '6px',
    color: '#15803d',
  },
  check: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  successText: {
    fontSize: '0.9rem',
  },
  btn: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    display: 'inline-block',
    textAlign: 'center',
    textDecoration: 'none',
  },
  btnPrimary: {
    background: '#667eea',
    color: 'white',
  },
  btnGhost: {
    background: 'transparent',
    border: '1px solid #cbd5e1',
    color: '#475569',
  },
  btnDanger: {
    background: '#ef4444',
    color: 'white',
  },
  btnSmall: {
    padding: '0.4rem 0.75rem',
    fontSize: '0.85rem',
  },
  btnLarge: {
    padding: '0.65rem 1.25rem',
    fontSize: '0.95rem',
  },
  btnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  progressBox: {
    flex: 1,
    height: '32px',
    background: '#e2e8f0',
    borderRadius: '6px',
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    transition: 'width 0.3s ease',
  },
  doneBadge: {
    padding: '0.4rem 0.75rem',
    background: '#dcfce7',
    color: '#15803d',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  viewer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '2rem',
  },
  viewerInner: {
    maxWidth: '90%',
    maxHeight: '90%',
    position: 'relative',
  },
  viewerImg: {
    maxWidth: '100%',
    maxHeight: '80vh',
    objectFit: 'contain',
    borderRadius: '8px',
  },
  closeBtn: {
    marginTop: '1rem',
    width: '100%',
  },
};

