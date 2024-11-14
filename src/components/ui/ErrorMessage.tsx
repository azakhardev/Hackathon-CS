import { IErrorMessage } from "../../lib/types/IErrorMessage";

interface IProps {
  errorMessage: IErrorMessage;
}

export default function ErrorMessage({ errorMessage }: IProps) {
  return (
    <div className="bg-red-300 border-red-500 border-[1px] rounded-md p-8 m-8">
      <div className="border-b-[1px] border-red-500 pb-2">
        <h2 className="font-bold">Error while loading data:</h2>
      </div>
      <div className="pt-2">
        <p>
          Error {errorMessage.code}: {errorMessage.error}
        </p>
        <p>{errorMessage.message}</p>
      </div>
    </div>
  );
}
