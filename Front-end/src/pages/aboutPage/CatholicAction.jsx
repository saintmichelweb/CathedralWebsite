import React, { useEffect, useState } from "react";
import { CatholicActionGroups } from "../../components";
import { fetchAboutCatholicActions } from "../../api/website";
import { useTranslation } from "react-i18next";

export const CatholicAction = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { catholicAction } = await fetchAboutCatholicActions();
        
        const items = (catholicAction || []).map((g, idx) => {
          const descKey = `description_${currentLang}`;
          return {
            id: g.id || idx,
            name: g.name || "Group",
            description: g.description?.[descKey] || g.description?.description_en || "",
            meeting: g.meeting || "",
            leader: g.leader?.name || g.leader || "",
            phone: g.leader?.phone || g.telephone || "",
            logo: g.logo || "",
          };
        });

        setGroups(items);
      } catch (e) {
        console.error("Error fetching Catholic Action groups:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [currentLang]);

  if (loading) {
    return <div className="text-center py-10">{t("loading") || "Loading Catholic Action Groups..."}</div>;
  }

  return (
    <div className="p-4">
      <CatholicActionGroups groups={groups} />
    </div>
  );
};
