const Part = ({part, total}) => {
    return(
    <>
      <p>{part.name} {part.exercises}</p>
    </>
    );
  }
  
  const Course = ({course}) => {
    const total = course.parts.reduce(
      (previousValue, currentValue) => 
      previousValue + currentValue.exercises,
      0,
    );
  
    return(
    <>
      <h2>{course.name}</h2>
      <>
        {course.parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </>
      <h4>total of {total} exercises</h4>
    </>
    );
  }

  export default Course