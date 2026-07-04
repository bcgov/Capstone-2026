import { useEffect, useState } from "react";

interface MetabaseDashboardProps {
  apiBaseUrl: string;
}

export default function MetabaseDashboard({ apiBaseUrl }: MetabaseDashboardProps) {
    const [token, setToken] = useState<string>("");
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/api/metabase`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setToken(data.token);
            } catch (error) {
                console.error("Error fetching Metabase token:", error);
            }
        };

        fetchToken();
    }, [apiBaseUrl]);

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <metabase-dashboard 
                token={token} 
                with-title="true" 
                with-downloads="true" 
            />
        </div>
    );
}