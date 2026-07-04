const textArea = document.getElementById("comment");
const textCount = document.querySelector("h2");
const wordCount = document.querySelector("h3");

textArea.addEventListener("input", () => {
  // text count ke liye

  const text = textArea.value;
  const textTrim = text.trim();
  textCount.textContent = ` TextCount: ${textTrim.length}`;

  //                          word count ke liye

  // split isliye ki word ko count krna h toh space ke basis pe arrat me convert kr diia
  const arr = textTrim.split(" ");

  console.log(arr);

  // filter isliye ki aagar space aa gya bich me
  // yeh aa gya sirf woh hi data do jo space nhi ho ['sudheer', 'mishra', 'is', '', '', 'a']

  //  filter
  const final = arr.filter((data) => {
    if (data != "") {
      return data;
    }
  });
  wordCount.textContent = `WordCount: ${final.length}`;
});
