import { useRef } from "react";
import classes from "./AddMovie.module.css";

export default function AddMovie(props) {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    props.onAddMovie(movie);

    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.input}>
        <label>Title</label>
        <input ref={titleRef} id="title" type="text" />
      </div>

      <div className={classes.input}>
        <label>Opening text</label>
        <textarea
          ref={openingTextRef}
          id="opening-text"
          type="text"
          rows="5"
          style={{ minHeight: "7rem" }}
        />
      </div>

      <div className={classes.input}>
        <label>Release date</label>
        <input ref={releaseDateRef} type="text" id="release-date" />
      </div>
      <button>Add Movie</button>
    </form>
  );
}
