import React, { useState } from "react";

export default function ThreatIntel() {
  const [ioc, setIoc] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    // TODO: Integrate with VirusTotal and AbuseIPDB APIs for IOC lookup
    setResult(`Simulated lookup result for IOC: ${ioc}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Threat Intelligence</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter IOC (IP, domain, hash)"
          value={ioc}
          onChange={(e) => setIoc(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-md"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
      {result && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Lookup Result:</h2>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}
