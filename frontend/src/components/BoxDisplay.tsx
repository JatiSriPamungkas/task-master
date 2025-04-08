type BoxDisplaySchema = {
  title: string;
  Icon: React.ElementType;
  totalTask: string;
};

const BoxDisplay: React.FC<BoxDisplaySchema> = ({ title, Icon, totalTask }) => {
  return (
    <>
      <div className="flex flex-col border-2 border-slate-300 border-solid grow-1 justify-center min-h-32 gap-5 bg-white p-6 rounded-2xl">
        <div className="flex sm:flex-col-reverse sm:gap-4 lg:flex-row lg:justify-between">
          <h3>{title}</h3>
          <Icon width={25} />
        </div>
        <h1 className="text-6xl">{totalTask}</h1>
      </div>
    </>
  );
};

export default BoxDisplay;
