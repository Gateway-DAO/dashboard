type Props = {
  queue: string[];
};

export default function MigrationStep({ queue }: Props) {
  return (
    <div>
      {queue.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
}
