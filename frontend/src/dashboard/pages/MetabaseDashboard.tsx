import { useEffect, useState } from "react";
import { Header, Footer,Button } from "@bcgov/design-system-react-components";
import {useNavigate, useParams} from "react-router-dom";

interface MetabaseDashboardProps {
  apiBaseUrl: string;
}

export default function MetabaseDashboard({ apiBaseUrl }: MetabaseDashboardProps) {
    const navigate = useNavigate();
    const [token, setToken] = useState<string>("");
    const dashboardId = useParams<{ dashboardId: string }>().dashboardId;
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/api/metabase/${dashboardId}`);
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
    }, [apiBaseUrl, dashboardId]);

    return (
        <div style={{ margin: 0 }}>
            <Header title="Capstone 2026 - All Forms">
                <Button variant="primary" onPress={() => navigate("/")}>
                    Test App
                </Button>
                <Button variant="primary" onPress={() => navigate("/dashboard/forms")}>
                    View Forms
                </Button>
                <Button variant="primary" onPress={() => navigate("/dashboard/formBuilder")}>
                    Form Builder
                </Button>
            </Header>
            <div style={{ width: "100%", height: "calc(100vh - 200px)" }}>
                {token ? (
                    <metabase-dashboard 
                        token={token} 
                        with-title="true" 
                        with-downloads="true" 
                    />
                    ) : (
                    <p>Loading Metabase dashboard...</p>
                )}
            </div>
            <Footer />
        </div>
    );
}