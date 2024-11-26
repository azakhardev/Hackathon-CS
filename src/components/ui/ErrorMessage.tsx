import { IErrorMessage } from "../../lib/types/IErrorMessage";

interface IProps {
  errorMessage: IErrorMessage;
}

export default function ErrorMessage({ errorMessage }: IProps) {
  return (
    <div className="bg-transparent border-red-800 border-[1px] rounded-md p-8">
      <div className=" pb-2">
        <h2 className="font-bold text-lg">Error while loading data:</h2>
      </div>
      <div className="pt-2">
        <p className="text-sm">
          Error {errorMessage.code}: {errorMessage.error}
        </p>
        <p>{errorMessage.message}</p>
      </div>
    </div>
  );
}
