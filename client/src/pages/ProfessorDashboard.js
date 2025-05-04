function ProfessorDashboard({ user, logout }) {
    return (
      <div className="container">
        <h1>Bem-vindo, Professor {user.nome || user.email}!</h1>
        <button className="button" onClick={logout}>Logout</button>
      </div>
    );
}
  
export default ProfessorDashboard;
  