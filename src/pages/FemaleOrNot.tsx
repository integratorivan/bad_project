export const FemaleOrNot = (props: { isFemale: boolean}) => {
    if (props.isFemale === true) {
      return <span style={{color: "black"}}>Вы выбрали Female!</span>;
    } else {
      return <span style={{color: "black"}}>Вы выбрали Male!</span>;
    }
}