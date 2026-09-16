function Sum({ number }) {
  return (
    <>
      <p>
        Total sum:
        {number >= 0
          ? (number * (number + 1)) / 2
          : (-number * (number - 1)) / 2}
      </p>
    </>
  );
}

export default Sum;
