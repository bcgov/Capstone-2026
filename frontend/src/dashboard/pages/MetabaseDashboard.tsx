import { useEffect, useState } from "react";
import type { Key } from "react";
import { Header, Button, Select } from "@bcgov/design-system-react-components";
import { useNavigate, useParams } from "react-router-dom";
import type { FormSummary } from "./FormsPage";
import { useAuth } from "../../auth/AuthContext";
import { useFeedback } from "../../feedback/FeedbackProvider"; 

interface MetabaseDashboardProps {
  forms: FormSummary[];
  setForms: React.Dispatch<React.SetStateAction<FormSummary[]>>;
}

export const MetabaseDashboard: React.FC<MetabaseDashboardProps> = () => {
    const navigate = useNavigate();
    const { logout, isAuthenticated, userId } = useAuth();
    const [ownedForms, setOwnedForms] = useState<FormSummary[]>([]);
    const { dashboardId: routeDashboardId } = useParams(); 
    const { apiBaseUrl } = useFeedback();
    
    const fallbackId = window.location.pathname.split("/").pop() || "";
    const activeId = routeDashboardId || fallbackId;

    const [selectedId, setSelectedId] = useState<string>(activeId);
    const [token, setToken] = useState<string>("");
    const [hasError, setHasError] = useState<boolean>(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        if (!userId) return;

        fetch(`${apiBaseUrl}/api/form/owner/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setOwnedForms(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error("Failed to load forms", err);
            });
    }, [userId, apiBaseUrl]);

    // Keep state synced if URL changes externally
    useEffect(() => {
        if (activeId && activeId !== selectedId) {
            setSelectedId(activeId);
        }
    }, [activeId, selectedId]);

    // Fetch new token whenever selectedId changes
    useEffect(() => {
        const fetchToken = async () => {
            if (!selectedId) return;
            setToken(""); // Clear previous token while fetching new one
            setHasError(false); // Reset error state

            try {
                const response = await fetch(`${apiBaseUrl}/api/metabase/${selectedId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setToken(data.token);
                setHasError(false);
;            } catch (error) {
                console.error("Error fetching Metabase token:", error);
                setHasError(true);
            }
        };

        fetchToken();
    }, [apiBaseUrl, selectedId]);

    const selectOptions = ownedForms ? ownedForms.map((form) => ({
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

    const metabaseSiteUrl = "https://metabase-route-b4cd74-dev.apps.silver.devops.gov.bc.ca";
    const iframeSrc = token ? `${metabaseSiteUrl}/embed/dashboard/${token}#bordered=false&titled=false` : "";

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
            <Header title="Capstone 2026 - Dashboards">
                <Button variant="primary" onPress={() => navigate("/")}>
                    Test App
                </Button>
                <Button variant="primary" onPress={() => navigate("/dashboard/forms")}>
                    View Forms
                </Button>
                <Button variant="primary" onPress={() => navigate("/dashboard/formBuilder")}>
                    Form Builder
                </Button>
                {isAuthenticated ? (
                    <Button variant="secondary" onPress={handleLogout}>
                        Logout
                    </Button>
                ) : (
                    <Button variant="primary" onPress={() => navigate("/login")}>
                        Login
                    </Button>
                )}
            </Header>

            {ownedForms && ownedForms.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "20px", overflow: "hidden", }}>
                    <Select
                        style={{ marginBottom: "20px", width: "300px" }}
                        key={selectedId}
                        description="Select a dashboard to view"
                        label="Available Dashboards"
                        items={selectOptions}
                        onChange={handleSelectChange}
                        value={selectedId}
                    />
                    <div style={{ flex: 1, overflow: "hidden", minHeight: 0}}>
                        {hasError ? (
                            <div style={{ textAlign: "center", padding: "60px" }}>
                                <h2 style={{ fontFamily: "BC Sans", color: "#333" }}>Dashboard Not Available Yet</h2>
                                <p style={{ color: "#666", marginTop: "8px" }}>
                                    A Metabase dashboard has not been created or linked for this form yet.
                                </p>
                            </div>
                        ) : token ? (
                            <iframe
                                title="Metabase Dashboard"
                                src={iframeSrc}
                                width="100%"
                                height="100%"
                                allow="fullscreen"
                                style={{ border: "none" }}
                            />
                        ) : (
                            <p style={{ textAlign: "center", padding: "40px" }}>Loading dashboard token...</p>
                        )}
                    </div>
                </div>
            ) : (
                <div style={{ margin: "40px", textAlign: "center" }}>
                    <h1 style={{ fontFamily: "BC Sans" }}>No dashboards available yet.</h1>
                </div>
            )}
        </div>
    );
};