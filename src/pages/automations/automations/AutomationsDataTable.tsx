import { AutomationModel } from "@/lib/models/AutomationModel";
import { useQuery } from "@tanstack/react-query";
import AutomationsTable from "@/pages/automations/automations/AutomationsTable";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { IAutomationType } from "../../../lib/types/IAutomationType";
import { IAutomation } from "@/lib/types/IAutomation";
import Throbber from "@/components/ui/Throbber";
import SearchBar from "@/components/ui/table/SearchBar";
import { useState } from "react";
import SelectInput, { ISelectItem } from "@/components/SelectInput";
import { calculateTimeFilter } from "@/lib/utils/calculateTimeFilter";
import { format } from "date-fns";

export default function AutomationsDataTable({
  limit = 9999,
  isNav = false,
}: {
  limit: number | undefined;
  isNav: boolean | undefined;
}) {
  const [searchText, setSearchText] = useState("");
  const [searchTime, setSearchTime] = useState("");

  const automationsQuery = useQuery({
    queryKey: [
      "automation",
      { searchText: searchText, searchTime: searchTime },
    ],
    queryFn: async () => {
      const calculatedTime = searchTime
        ? calculateTimeFilter(searchTime)
        : null;

      const filters = {
        ...(searchText && searchText.trim() !== "" && { id_like: searchText }),
        ...(calculatedTime && {
          last_activity_gte: format(calculatedTime, "yyyy-MM-dd'T'HH:mm:ss"),
        }),
      };

      return AutomationModel.getAutomations(
        undefined,
        limit,
        undefined,
        "timestamp",
        "desc",
        filters
      );
    },
  });
  const automationsTypesQuery = useQuery({
    queryKey: ["automationTypes"],
    queryFn: async () => await AutomationModel.getAutomationTypes("", 9999),
  });

  if (automationsQuery.data && "error" in automationsQuery.data)
    return (
      <ErrorMessage errorMessage={automationsQuery.data as IErrorMessage} />
    );

  if (automationsQuery.error || automationsTypesQuery.error) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  // Data joining logic
  let automationsWithTypes = null

  if (!(automationsQuery.isLoading || automationsTypesQuery.isLoading )) {
    automationsWithTypes = (automationsQuery.data as IAutomation[]).map(
      (automation: IAutomation) => {
        const matchedType = Array.isArray(automationsTypesQuery.data)
          ? automationsTypesQuery.data.find(
              (type: IAutomationType) => type.type === automation.type
            )
          : null;
        return { ...automation, type_object: matchedType || null };
      }
    );
  }   

  const timeVals: ISelectItem[] = [
    { value: "2y", content: "2y" },
    { value: "1y", content: "1y" },
    { value: "6m", content: "6m" },
    { value: "3m", content: "3m" },
    { value: "1m", content: "1m" },
    { value: "14d", content: "14d" },
    { value: "7d", content: "7d" },
  ];

  return (
    <>
      <div>
        <div className="grid grid-cols-2">
        <SearchBar
          searchText={searchText ?? ""}
          setSearchText={setSearchText}
        />
        <SelectInput
          placeholder="All time"
          items={timeVals}
          onValueChange={(e) => setSearchTime(e)}
        />
        </div>
        
        {automationsQuery.isLoading || automationsTypesQuery.isLoading ? (
          <Throbber />
        ) : (
          <AutomationsTable
            automations={automationsWithTypes as IAutomation[]}
          />
        )}
      </div>
    </>
  );
}
