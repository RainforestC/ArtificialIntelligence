function generateSequence() {
    var sequence = [];
    var length = Math.floor(Math.random() * 10) + 1; // 随机生成序列的长度
  
    for (var i = 0; i < length; i++) {
      var value = Math.floor(Math.random() * 10) + 1; // 随机生成每个元素的值
      sequence.push(value); // 将元素添加到序列中
    }
  
    return sequence;
  }
  
  function generateDiscount() {
    var discount = 0;
  
    while (discount === 0) {
      discount = Math.random().toFixed(2); // 生成随机折扣
    }
  
    return discount;
  }
  
  var correctAnswer = 0;
  
  function calculateResult() {
    var sequence = generateSequence();
    var discount = generateDiscount();
    var result = 0;
  
    for (var i = 0; i < sequence.length; i++) {
      result += sequence[i] * Math.pow(discount, i);
    }
    correctAnswer = result.toFixed(2);
  
    document.getElementById("discount").textContent = discount;
    document.getElementById("sequence").textContent = sequence.join(", ");
  
    return result;
  }
  
  function checkAnswer() {
    var userAnswer = document.getElementById("userAnswer").value;
    if (userAnswer.trim() === correctAnswer) {
      window.alert("回答正确！");
    } else {
      window.alert("回答错误，正确答案为 " + correctAnswer);
    }
  }