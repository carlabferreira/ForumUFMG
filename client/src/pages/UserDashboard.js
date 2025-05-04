function UserDashboard({ user, logout }) {
    return (
      <div className="container">
        <h1>Bem-vindo, {user.nome || user.email}!</h1>
        <button className="button" onClick={logout}>Logout</button>
      </div>
    );
}
  
export default UserDashboard;
  