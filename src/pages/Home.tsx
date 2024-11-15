import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="m-8">
      <h1>Homepage</h1>
      <Link to="/runners">
        <Button variant="link">Runners</Button>
      </Link>
      <Link to="/automations">
        <Button variant="link">Automations</Button>
      </Link>
    </main>
  );
}
