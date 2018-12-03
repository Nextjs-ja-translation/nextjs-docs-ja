export default props => {
  return (
    <div style={{ textAlign: 'center', marginTop: '25px', maxWidth: '100px' }}>
      <div>
        <img
          src={props.avatarURL}
          alt={props.avatarURL}
          style={{ width: '100%', borderRadius: '50%' }}
        />
      </div>
      <div>
        <a href={props.url} target="_blank" rel="noopener noreferrer">
          {props.username}
        </a>
      </div>
    </div>
  );
};
