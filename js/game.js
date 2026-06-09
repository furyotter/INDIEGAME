$(document).ready(function () {
  var eventnum = 1;
  var threshold = 100;

  var swiper = new Swiper(".calculator", {
    allowTouchMove: false,
    effect: "fade",
  });
  // 第1页
  $("#slide1-btn").on("mouseover", function () {
    this.setAttribute("src", "images/button2.png");
  });
  $("#slide1-btn").on("mouseout", function () {
    this.setAttribute("src", "images/button1.png");
  });
  $("#slide1-btn").on("click", function () {
    $("#fanye")[0].play();
    swiper.slideNext();
  });

  // 第2页
  $("#price").on("input", function () {
    $("#priceSpan").html(this.value);
  });
  $("#salary").on("input", function () {
    $("#salarySpan").html(this.value);
  });
  $("#peoplenum").on("input", function () {
    $("#peoplenumSpan").html(this.value);
  });
  $("#period").on("input", function () {
    $("#periodSpan").html(this.value);
  });
  $("#slide2-btn").on("click", function () {
    $("#fanye")[0].play();
    arrIndex = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28,
    ];
    shuffleArray(arrIndex);
    $(".eventname1").html(events[arrIndex[0]].name);
    $(".eventsource1").html(events[arrIndex[0]].source);

    $(".eventname2").html(events[arrIndex[1]].name);
    $(".eventsource2").html(events[arrIndex[1]].source);

    $(".eventname3").html(events[arrIndex[2]].name);
    $(".eventsource3").html(events[arrIndex[2]].source);

    threshold = threshold + events[arrIndex[0]].value;
    threshold = threshold + events[arrIndex[1]].value;
    threshold = threshold + events[arrIndex[2]].value;
    console.log(threshold);
    swiper.slideNext();
    $(".randomevent1").addClass("animate__bounceInDown");
  });

  // 第3页
  $("#slide3-btn").on("click", function () {
    $("#fanye")[0].play();
    switch (eventnum) {
      case 1:
        $(".randomevent2").addClass("animate__bounceInDown");
        eventnum++;
        break;
      case 2:
        $(".randomevent3").addClass("animate__bounceInDown");
        eventnum++;
        break;
      default:
        begin_calc();
        swiper.slideNext();
    }

    $("#slide4-btn").on("click", function () {
      eventnum = 1;
      threshold = 100;
      swiper.slideTo(1);
      $(".randomevent1").removeClass("animate__bounceInDown");
      $(".randomevent2").removeClass("animate__bounceInDown");
      $(".randomevent3").removeClass("animate__bounceInDown");
    });
  });

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 生成一个随机数，范围为[0,i]
      [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换位置
    }
    return arr;
  }
  function begin_calc() {
    var price, salary, peoplenum, period, death_rate;
    var alive_gamenum = 0;
    var dead_gamenum = 0;
    var total_gamenum = 0;

    price = $("#price").val();
    salary = $("#salary").val();
    peoplenum = $("#peoplenum").val();
    period = $("#period").val();

    dev_expenses = salary * 1000 * peoplenum * period;

    for (var i = 0; i < gameArr.length; i++) {
      all_comments = gameArr[i].good_comments + gameArr[i].bad_comments;
      sale_forecast = all_comments * 30 * price;
      income_forecast = sale_forecast * 0.65;
      if (all_comments >= threshold) {
        if (income_forecast > dev_expenses) {
          alive_gamenum += 1;
        } else {
          dead_gamenum += 1;
        }
      }
    }

    total_gamenum = alive_gamenum + dead_gamenum;
    death_rate = dead_gamenum / total_gamenum;
    death_rate_show = ((dead_gamenum / total_gamenum) * 100).toFixed(1) + "%";
    console.log(death_rate);
    $("#result").html(death_rate_show);
    if (death_rate < 0.5) {
      // $(".slide4").css("background-image", "url(images/活.png)");
      $("#gameresult").attr("src", "images/活.png")
    } else {
      // $(".slide4").css("background-image", "url(images/死.png)");
      $("#gameresult").attr("src", "images/死.png")
    }
  }
});
