export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Welcome to Shree Infotech Admin</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Select an option from the sidebar to manage your website content.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px' }}>Refurbished Laptops</h3>
          <p style={{ color: '#64748b', marginBottom: '16px' }}>Manage your inventory of refurbished laptops and computers. Add new items, update specifications, or mark as sold out.</p>
          <a href="/admin/products" style={{ color: '#3b82f6', fontWeight: '500', textDecoration: 'none' }}>Manage Inventory →</a>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px' }}>Site Content</h3>
          <p style={{ color: '#64748b', marginBottom: '16px' }}>Update general website information such as your hero banner text, phone numbers, working hours, and more.</p>
          <a href="/admin/content" style={{ color: '#3b82f6', fontWeight: '500', textDecoration: 'none' }}>Edit Content →</a>
        </div>
      </div>
    </div>
  );
}
