import TimonOfAthens from "../../assets/timon-of-athenss.png";

const ListPlayItem = () => {
  return (
    <div className="flex items-center justify-between rounded-lg shadow-[4px_0px_15px_rgba(31,_31,_31,_0.08),_0px_4px_15px_rgba(31,_31,_31,_0.08)] px-8 py-4">
      <div className="flex items-center">
        <div>
          <img src={TimonOfAthens} alt="Timon of Athens" />
        </div>
        <p className="ml-4 font-bold text-xl">The Life of Timon of Athens</p>
      </div>

      <div className="text-[#636366]">
        <p>5 Acts</p>
        <p>20 Scenes</p>
      </div>
    </div>
  );
};

export default ListPlayItem;
