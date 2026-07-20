import { useEffect, useState } from "react";
import type { Key } from "react";
import { Header, Button, Select } from "@bcgov/design-system-react-components";
import { useNavigate, useParams } from "react-router-dom";
import type { FormSummary } from "./FormsPage";

interface MetabaseDashboardProps {
  apiBaseUrl: string;
  forms: FormSummary[];
}

export const MetabaseDashboard: React.FC<MetabaseDashboardProps> = ({ forms, apiBaseUrl }) => {
    const navigate = useNavigate();
    const { dashboardId: routeDashboardId } = useParams(); // Using react-router params if available
    
    const fallbackId = window.location.pathname.split("/").pop() || "";
    const activeId = routeDashboardId || fallbackId;

    const [selectedId, setSelectedId] = useState<string>(activeId);
    const [token, setToken] = useState<string>("");

    // Keep state synced if URL changes externally
    useEffect(() => {
        if (activeId && activeId !== selectedId) {
            setSelectedId(activeId);
        }
    }, [activeId]);

    // Fetch new token whenever selectedId changes
    useEffect(() => {
        const fetchToken = async () => {
            if (!selectedId) return;
            try {
                const response = await fetch(`${apiBaseUrl}/api/metabase/${selectedId}`);
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
    }, [apiBaseUrl, selectedId]);

    const selectOptions = forms ? forms.map((form) => ({
        id: form.id.toString(),
        label: form.name,
    })) : [];

    const handleSelectChange = (value: Key | null) => {
        if (value) {
            const newId = value.toString();
            setSelectedId(newId);
            navigate(`/dashboard/metabase/${newId}`); 
        }
    };

    if (!forms || forms.length === 0) {
        return <div>Loading dashboards...</div>;
    }

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
            <Select
                style={{ margin: "20px", width: "300px" }}
                key={selectedId}
                description="Select a dashboard to view"
                label="Available Dashboards"
                items={selectOptions}
                onChange={handleSelectChange}
                value={selectedId}
            />
            <div style={{ width: "100%", height: "calc(100vh - 80px)" }}>
                <metabase-dashboard 
                    key={token} 
                    token={token} 
                    with-title="true" 
                    with-downloads="true" 
                />
            </div>
        </div>
    );
};