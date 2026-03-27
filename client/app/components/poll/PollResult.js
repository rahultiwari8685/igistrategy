const PollResult = ({ poll }) => {
  if (!poll || !poll.options) return null;
  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">{poll.question}</h2>

      <div className="space-y-4">
        {poll.options.map((opt, i) => {
          const percent = totalVotes
            ? Math.round((opt.votes / totalVotes) * 100)
            : 0;

          return (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span>{opt.text}</span>
                <span>{percent}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Total Votes: {totalVotes}
      </p>
    </div>
  );
};

export default PollResult;
