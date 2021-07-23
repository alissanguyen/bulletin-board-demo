import emptyStateIllustration from "../empty-state.svg";


interface Props {}

const EmptyState: React.FC<Props> = () => {
  return (
    <div className="empty-state">
      <p className="empty-state-description-headline">Organizing your thoughts?</p>

      <p className="empty-state-description">
        Start making your stickies now with the "Add new" button above!
      </p>
      <img
        className="empty-state-illustration"
        src={emptyStateIllustration}
        alt="empty-state-illustration"
      />
    </div>
  );
};

export default EmptyState;
