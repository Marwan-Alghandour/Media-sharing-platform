import { useState } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import Media from "../entities/Media";
import useLikeMedia from "../hooks/useLikeMedia";

interface Props {
  media: Media;
}

const Card = ({ media }: Props) => {
  const [liked, setLiked] = useState(media.liked);
  const { mutate } = useLikeMedia();

  const onClickLike = () => {
    setLiked(!liked);
    mutate({ id: media.id, liked: !media.liked });
  };

  return (
    <Container className="my-2" fluid>
      <Row>
        <Col className="d-flex img-container justify-content-center">
          {media.type.startsWith("image") ? (
            <Image
              src={media.path}
              alt={media.name}
              className="object-fit-contain"
              width="100%"
              height="100%"
              onClick={() => window.open(media.path, "_blank")}
            />
          ) : (
            <video
              className="object-fit-contain"
              width="100%"
              height="100%"
              controls
            >
              <source src={media.path} type={media.type} />
              {`Your browser does not support HTML video to play  ${media.name}.`}
            </video>
          )}
        </Col>
      </Row>
      <Row className="mt-2 px-1">
        <Col xs={3} className="mx-2 p-0 d-grid justify-content-start icon">
          {liked ? (
            <IoIosHeart onClick={onClickLike} />
          ) : (
            <IoIosHeartEmpty onClick={onClickLike} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Card;
