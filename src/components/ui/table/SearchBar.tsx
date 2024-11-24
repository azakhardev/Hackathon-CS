import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

export default function SearchBar({
  searchText,
  setSearchText: setSearchText,
}: SearchBarProps) {
  const { t } = useTranslation() 
  const handleValueChange = (value: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('text', value)
    window.history.pushState({}, '', url)

    setSearchText(value)
  }

  return (
    <div className="relative flex items-center w-1/3">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={20} />
      </div>
      <Input
        className="pl-10"
        value={searchText}
        onChange={(e) => handleValueChange(e.target.value)}
      />
      {searchText === "" && (
        <div className="absolute inset-y-0 flex items-center pointer-events-none left-8">
          <p className="ml-2 text-sm">{t('translation:filters:text')}</p>
        </div>
      )}
    </div>
  );
}
