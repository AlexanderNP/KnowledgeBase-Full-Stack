import { useState } from "react";
import { Button } from "@/components/ui/button";

function App() {
  const [loading, setLoading] = useState(false);

  const abc = '1';

  return (
    <div>
      <h1 className="text-9xl">Hello</h1>
      <Button>Нажми</Button>
    </div>
  );
}

export default App;
