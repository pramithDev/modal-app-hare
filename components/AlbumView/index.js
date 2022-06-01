const AlbumView = ({ slug ,itemDetails}) => {
  return (
    <div>
      <h1>{slug}</h1>
      <h1>{itemDetails}</h1>
      {/* <p>{album.attributes.name}</p> */}
    </div>
  )
}

export default AlbumView;