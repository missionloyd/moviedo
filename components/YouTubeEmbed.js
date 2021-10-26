import React from "react";
import PropTypes from "prop-types";
import '../styles/YouTube.module.css'

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width='100%'
      height='290rem'
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      style={{ borderRadius: '5px' }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;