var ISTMinors = new Array();
var ISTFaculty = new Array();

function myXhr(t, d) {
	return $.ajax({
		type: t,
		url: 'proxy.php',
		dataType: 'json',
		data: d,
		cache: false,
		async: true
	});
}

// Check if value is null, then return the empty string
function isNull(x) {
	if (!x) {
		return "";
	} else {
		return x
	};
}

$(document).ready(function () {
	//Pull the information from API 'ABOUT'
	myXhr('get', {
		path: '/about/'
	}).done(function (json) {
		var x = "<h2 class = 'text-uppercase'><strong>" + json.title + "</h2></strong>";
		x += "<p class='text-faded mb-5 pt-2'>" + json.description + "</p>";
		x += "<blockquote class='blockquote'>";
		x += "<p class='mb-0'>" + json.quote + "</p>";
		x += "<footer class='blockquote-footer text-warning pt-2'>" + json.quoteAuthor + "</footer>";
		x += "</blockquote>";
		$("#about").append(x);
	});

	//Pull the information from API 'DEGREES' -UNDERGRADUATE WMC
	myXhr('get', {
		path: '/degrees/undergraduate/degreeName=wmc'
	}).done(function (json) {
		$("#wmctitle").append(json.title);
		$("#wmcdescription").append(json.description);
		for (var i = 0; i < json.concentrations.length; i++) {
			var x = "<li class='list-group-item'>" + json.concentrations[i] + "</li>";
			$("#wmclist").append(x);
		}
	});

	//Pull the information from API 'DEGREES' -UNDERGRADUATE HCC
	myXhr('get', {
		path: '/degrees/undergraduate/degreeName=hcc'
	}).done(function (json) {
		$("#hcctitle").append(json.title);
		$("#hccdescription").append(json.description);
		for (var i = 0; i < json.concentrations.length; i++) {
			var x = "<li class='list-group-item'>" + json.concentrations[i] + "</li>";
			$("#hcclist").append(x);
		}
	});

	//Pull the information from API 'DEGREES' -UNDERGRADUATE CIT
	myXhr('get', {
		path: '/degrees/undergraduate/degreeName=cit'
	}).done(function (json) {
		$("#cittitle").append(json.title);
		$("#citdescription").append(json.description);
		for (var i = 0; i < json.concentrations.length; i++) {
			var x = "<li class='list-group-item'>" + json.concentrations[i] + "</li>";
			$("#citlist").append(x);
		}
	});

	//Pull the information from API 'DEGREES' -GRADUATE IST
	myXhr('get', {
		path: '/degrees/graduate/degreeName=ist'
	}).done(function (json) {
		$("#isttitle").append(json.title);
		$("#istdescription").append(json.description);
		for (var i = 0; i < json.concentrations.length; i++) {
			var x = "<li class='list-group-item'>" + json.concentrations[i] + "</li>";
			$("#istlist").append(x);
		}
	});

	//Pull the information from API 'DEGREES' -GRADUATE HCI
	myXhr('get', {
		path: '/degrees/graduate/degreeName=hci'
	}).done(function (json) {
		$("#hcititle").append(json.title);
		$("#hcidescription").append(json.description);
		for (var i = 0; i < json.concentrations.length; i++) {
			var x = "<li class='list-group-item'>" + json.concentrations[i] + "</li>";
			$("#hcilist").append(x);
		}
	});

	//Pull the information from API 'DEGREES' -GRADUATE NSA
	myXhr('get', {
		path: '/degrees/graduate/degreeName=nsa'
	}).done(function (json) {
		$("#nsatitle").append(json.title);
		$("#nsadescription").append(json.description);
		for (var i = 0; i < json.concentrations.length; i++) {
			var x = "<li class='list-group-item'>" + json.concentrations[i] + "</li>";
			$("#nsalist").append(x);
		}
	});

	//Pull the information from API 'DEGREES' -GRADUATE ADVANCED CERTIFICATES [WEB DEVELOPMENT]
	myXhr('get', {
		path: '/degrees/graduate/degreeName=graduate%20advanced%20certificates'
	}).done(function (json) {
		$("#web").append(json.availableCertificates[0]);
	});

	//Pull the information from API 'DEGREES' -GRADUATE ADVANCED CERTIFICATES [NETWORKING]
	myXhr('get', {
		path: '/degrees/graduate/degreeName=graduate%20advanced%20certificates'
	}).done(function (json) {
		$("#networking").append(json.availableCertificates[1]);
	});

	//Pull the information from API 'MINORS' -DBDDI-MN
	myXhr('get', {
		path: '/minors/UgMinors'
	}, '#db').done(function (json) {
		for (var i = 0; i < json.UgMinors.length; i++) {
			//alert(json.UgMinors[i].name);
			//alert(json.UgMinors[i].title);
			//alert(json.UgMinors[i].description);
			//alert(json.UgMinors[i].courses.length);
			//alert(json.UgMinors[i].courses[0])
			//alert(json.UgMinors[i].note);


			var x = "<div class='card'><div class='card-header'";
			x += "id='heading" + json.UgMinors[i].name + "'>";
			x += "<h5 class='mb-0'><button class='btn btn-link'";
			x += "data-toggle='collapse' data-target='#collapse";
			x += json.UgMinors[i].name + "' aria-expanded='false'";
			x += "aria-controls='" + json.UgMinors[i].name + "'>";
			x += json.UgMinors[i].title + "</button></h5></div>";
			x += "<div id='collapse" + json.UgMinors[i].name + "'";
			x += "class='collapse' aria-labelledby='heading";
			x += json.UgMinors[i].name + "' data-parent='#Minoraccordion'>";
			x += "<div class='card-body'><div class='center-block'>";
			x += "<img class='img-responsive' src='img/minorIcon/";
			x += json.UgMinors[i].name + ".png'></div>";
			x += "<span class='lead'>" + json.UgMinors[i].description;
			x += "</span>";

			//check if the note JSON object is existed.
			if (!json.UgMinors[i].note.length === 0) {
				x += "<div class='classWithPad'><p><span class='";
				x += "text-warning strong'>Note: </span>";
				x += json.UgMinors[i].note + "</div>";
			}
			x += "<hr><h3><strong>Courses</strong></h3>";
			x += "<div class='row'>";

			//foreach loop courses
			for (var j = 0; j < json.UgMinors[i].courses.length; j++) {
				var string = '/course/courseID=' + json.UgMinors[i].courses[j];
				ISTMinors.push(string);
				x += "<div class='col-md-4'>";
				x += "<button type='button' class='btn btn-primary classWithPad' data-toggle='modal' data-target='#" + json.UgMinors[i].courses[j] + "Modal'>";
				x += json.UgMinors[i].courses[j] + "</button></div>";
			}
			x += "</div></div></div></div>";
			$("#Minoraccordion").append(x);

		}
	}).then(function () {
		//foreach loop to create the modal dialog
		for (var i = 0, length = ISTMinors.length; i < length; i++) {
			(function (i) {
				var str = ISTMinors[i];
				//console.log(str);
				var n = str.lastIndexOf('=');
				var result = str.substring(n + 1);
				myXhr('get', {
					path: ISTMinors[i]
				}, '#minors').done(function (json) {
					var x = "<div class='modal fade' id='" + result +
						"Modal' tabindex='-1' role='dialog' aria-labelledby='";
					x += result + "ModelLabel'";
					x += "aria-hidden='true'><div class='modal-dialog'";
					x += "role='document'>";
					x += "<div class='modal-content'>"
					x += "<div class='modal-header'>";
					x += "<h5 class='modal-title' id='" + result + "ModalLongTitle'>";
					x += json.title + "</h5><button type='button' class='close'";
					x += " data-dismiss='modal' aria-label='Close'>";
					x += "<span aria-hidden='true'>×</span></button></div>";
					x += "<div class='modal-body'>" + json.description + "</div>";
					x += "<div class='modal-footer'>";
					x += "<button type='button' class='btn btn-secondary' ";
					x += "data-dismiss='modal'>Close</button></div></div></div></div>";
					$("#minorDialog").append(x);
				});
			})(i);

		}
	});


	//Pull the information from API 'EMPLOYMENT'
	myXhr('get', {
		path: '/employment/'
	}, '#employment').done(function (json) {
		$("#introtitle").append(json.introduction.title);
		$("#employtitle").append(json.introduction.content[0].title);
		$("#employdescript").append(json.introduction.content[0].description);
		$("#cooptitle").append(json.introduction.content[1].title);
		$("#coopdescript").append(json.introduction.content[1].description);

		$("#salarytitle").append(json.degreeStatistics.statistics[0].value);
		$("#salarydescript").append(json.degreeStatistics.statistics[0].description);
		$("#ranktitle").append(json.degreeStatistics.statistics[1].value);
		$("#rankdescript").append(json.degreeStatistics.statistics[1].description);
		$("#percenttitle").append(json.degreeStatistics.statistics[2].value);
		$("#percentdescript").append(json.degreeStatistics.statistics[2].description);
		$("#traffictitle").append(json.degreeStatistics.statistics[3].value);
		$("#trafficdescript").append(json.degreeStatistics.statistics[3].description);

		$("#employertitle").append(json.employers.title);
		for (var i = 0; i < json.employers.employerNames.length; i++) {
			var x = "<li class='list-group-item'>";
			x += json.employers.employerNames[i] + "</li>";
			$("#employerlist").append(x)
		}
		$("#careertitle").append(json.careers.title);
		for (var i = 0; i < json.careers.careerNames.length; i++) {
			var x = "<li class='list-group-item'>";
			x += json.careers.careerNames[i] + "</li>";
			$("#careerlist").append(x);
		}


		for (var i = 0; i < json.coopTable.coopInformation.length; i++) {
			var x = "<tr>";
			x += "<td>" + json.coopTable.coopInformation[i].employer + "</th>";
			x += "<td>" + json.coopTable.coopInformation[i].degree + "</td>";
			x += "<td>" + json.coopTable.coopInformation[i].city + "</td>";
			x += "<td>" + json.coopTable.coopInformation[i].term + "</td>";
			x += "</tr>";
			$("#coopTable").append(x);
		}


		for (var i = 0; i < json.employmentTable.professionalEmploymentInformation.length; i++) {
			var x = "<tr>";
			x += "<th scope='row'>" + json.employmentTable.professionalEmploymentInformation[i].employer + "</th>";
			x += "<td>" + json.employmentTable.professionalEmploymentInformation[i].degree + "</td>";
			x += "<td>" + json.employmentTable.professionalEmploymentInformation[i].city + "</td>";
			x += "<td>" + json.employmentTable.professionalEmploymentInformation[i].title + "</td>";
			x += "<td>" + json.employmentTable.professionalEmploymentInformation[i].startDate + "</td>";
			x += "</tr>";
			$("#employertable").append(x);
		}
	});

	//Pull the information from API 'IST PEOPLE'
	myXhr('get', {
		path: '/people/'
	}, '#people').done(function (json) {

		$("#people-title").append(json.title);
		$("#people-subtitle").append(json.subTitle);

		//Insert Faculty
		for (var i = 0; i < json.faculty.length; i++) {

			// Create User Profile
			var x = "<div class='col-sm-3'><center><a href='#' data-toggle='modal' data-target='#" + json.faculty[i].username + "'>";
			x += "<img src='" + json.faculty[i].imagePath + "' width='140' height='140' class='rounded-circle'></a><h3>" + isNull(json.faculty[i].name) + "</h3></center></div>";
			$(".faculty .row").append(x);

			//Create Modal Window
			x = "<div class='modal fade' id='" + json.faculty[i].username + "' tabindex='-1' role='dialog' aria-labelledby='";
			x += json.faculty[i].username + "ModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'>";
			x += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'></button>";
			x += "<h4 class='modal-title' id='" + json.faculty[i].username + "ModalLabel'>More About " + json.faculty[i].name + "</h4></div>";
			x += "<div class='modal-body'><center><img src='" + json.faculty[i].imagePath + "' width='140' height='140' border='0' class='rounded-circle'>";
			x += "<h3 class='media-heading'>" + isNull(json.faculty[i].name) + "</h3>";
			x += "<p class='text-primary'>" + isNull(json.faculty[i].tagline) + "</p>";
			x += "<p class='text-primary'>" + isNull(json.faculty[i].title) + "</p>";
			x += "<p class='text-primary'>" + isNull(json.faculty[i].office) + "</p>";
			x += "<p class='text-primary'>" + isNull(json.faculty[i].website) + "</p>";
			x += "<p class='text-primary'>" + isNull(json.faculty[i].phone) + "</p>";
			x += "</center><hr/></div><div class='modal-footer'><center><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></center>";
			x += "</div></div></div></div>";
			ISTFaculty.push({
				username: json.faculty[i].username,
				imagePath: json.faculty[i].imagePath
			});
			$("#facultyDialog").append(x);
		}
		//Insert Staff
		for (var i = 0; i < json.staff.length; i++) {

			// Create User Profile
			var x = "<div class='col-sm-3'><center><a href='#' data-toggle='modal' data-target='#" + json.staff[i].username + "'>";
			x += "<img src='" + json.staff[i].imagePath + "' width='140' height='140' class='rounded-circle'></a><h3>" + isNull(json.staff[i].name) + "</h3></center></div>";
			$(".staff .row").append(x);

			//Create Modal Window
			x = "<div class='modal fade' id='" + json.staff[i].username + "' tabindex='-1' role='dialog' aria-labelledby='";
			x += json.staff[i].username + "ModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'>";
			x += "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'></button>";
			x += "<h4 class='modal-title' id='" + json.staff[i].username + "ModalLabel'>More About " + isNull(json.staff[i].name) + "</h4></div>";
			x += "<div class='modal-body'><center><img src='" + json.staff[i].imagePath + "' width='140' height='140' border='0' class='rounded-circle'>";
			x += "<h3 class='media-heading'>" + isNull(json.staff[i].name) + "</h3>";
			x += "<p class='text-primary'>" + isNull(json.staff[i].tagline) + "</p>";
			x += "<p class='text-primary'>" + isNull(json.staff[i].title) + "</p>";
			x += "<p class='text-primary'>" + isNull(json.staff[i].office) + "</p>";
			x += "<p class='text-primary'>" + isNull(json.staff[i].website) + "</p>";
			x += "<p class='text-primary'>" + isNull(json.staff[i].phone) + "</p>";
			x += "</center><hr/></div><div class='modal-footer'><center><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></center>";
			x += "</div></div></div></div>";
			$("#staffDialog").append(x);
		}
	});

	// Pull the informatin from API 'IST Research''
	myXhr('get', {
		path: '/research/'
	}, '#research').done(function (json) {
		for (var i = 0; i < json.byFaculty.length; i++) {
			//Check IST Faculty Array to retrieve the image path.
			for (var j = 0; j < ISTFaculty.length; j++) {
				if (ISTFaculty[j].username === json.byFaculty[i].username) {
					// Create User Profile
					var x = "<div class='col-sm-3'><center><a href='#' data-toggle='modal' data-target='#" + json.byFaculty[i].username + "-research'>";
					x += "<img src='" + ISTFaculty[j].imagePath + "' width='140' height='140' class='rounded-circle'></a><h3>" + json.byFaculty[i].facultyName + "</h3></center></div>";
					$(".faculty-research .row").append(x);
				}
			}

			// Prepare the Bootstrap Table inside modal
			var x = "<div id='" + json.byFaculty[i].username + "-research' class='modal fade text-dark' tabindex='-1' role='dialog' aria-labelledby='";
			x += json.byFaculty[i].username + "-researchTableModalLabel' aria-hidden='true'>";
			x += "<div class='modal-dialog modal-lg'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'";
			x += "aria-hidden='true'>x</button></div><div class='modal-body'><table class='table'><thead class='bg-primary'><tr><th class='text-center' scope='col'>";
			x += "Citations</th></tr></thead><tbody>";

			//Iterating over Citation Array
			$.each(json.byFaculty[i].citations, function (index, value) {
				x += "<tr><td>" + value + "</td></tr>";
			});
			x += "</tbody></table></div><div class='modal-footer'><button type='button' class='btn btn-primary' data-dismiss='modal'>Close</button></div>";
			x += "</div></div></div>";
			$("#researchDialog").append(x);
		}
	});

	// Pull the information from API 'IST Resources'
	myXhr('get', {
		path: '/resources/'
	}, "#resource").done(function (json) {

		//Student Resources API
		$("#resourcetitle").append(json.title);
		$('#resourcesubtitle').append(json.subTitle);
		$("#enrollinfo").append(json.coopEnrollment.title);

		//Coop Enrollment
		var x = "";
		$.each(json.coopEnrollment.enrollmentInformationContent, function (index, value) {
			x += "<h3>" + value.title + "</h3>";
			x += "<p>" + value.description + "</h3>";
		});
		$("#enrollinfo").after(x);

		//Student Ambassdors
		$("#studentAmbassadorsTitle").append(json.studentAmbassadors.title);
		$(".studentAmbassdorsImage").attr("src", json.studentAmbassadors.ambassadorsImageSource);
		x = ""; //Reset it
		$.each(json.studentAmbassadors.subSectionContent, function (index, value) {
			x += "<h3>" + value.title + "</h3>";
			x += "<p>" + value.description + "</h3>";
		});
		$(".studentAmbassdorsImage").after(x);

		//Student Services
		$("#studentServicesTitle").append(json.studentServices.title);
		x = ""; //Reset it

		// Academic Advisors
		x += "<h3>" + json.studentServices.academicAdvisors.title + "</h3>";
		x += "<p>" + json.studentServices.academicAdvisors.description + "</p>";
		x += "<button type='button' class='btn btn - outline - primary mb-3'>"
		x += "<a href='" + json.studentServices.academicAdvisors.faq.contentHref + "'>" + json.studentServices.academicAdvisors.faq.title + "</a></button>";

		//Faculty Advisors
		x += "<h3>" + json.studentServices.facultyAdvisors.title + "</h3>";
		x += "<p>" + json.studentServices.facultyAdvisors.description + "</p>";


		//IST Minor Advising
		x += "<h3>" + json.studentServices.istMinorAdvising.title + "</h3>";

		$.each(json.studentServices.istMinorAdvising.minorAdvisorInformation, function (index, value) {
			$("#minorAdvisorInformation tbody").append("<tr><td>" + value.title + "</td><td>" + value.advisor + "</td><td>" + value.email + "</td></tr>");
		});

		$("#studentServicesTitle").after(x);


		//Professional Advisors
		$("#minorAdvisorInformation").after("<h3>" + json.studentServices.professonalAdvisors.title + "</h3>");


		//console.log(json.studentServices.academicAdvisors.faq.title);
		$.each(json.studentServices.professonalAdvisors.advisorInformation, function (index, value) {
			$("#professionalAdvisorInformation tbody").append("<tr><td>" + value.name + "</td><td>" + value.department + "</td><td>" + value.email + "</td></tr>");
		});

		//Study Abroad
		$("#studyAbroadTitle").append(json.studyAbroad.title);
		$("#studyAbroadTitle").after("<p>" + json.studyAbroad.description + "</p>");
		$.each(json.studyAbroad.places, function (index, value) {
			x = "<div class='col-sm-6.'><div class='text-white bg-primary mb-3 mr-3 h-100' style='max-width: 18rem;'><div class='card-body'><h5 class='card-title'>";
			x += value.nameOfPlace + "</h5><p class='card-text'>" + value.description + "</p></div></div></div>";
			$(".studyAbroadPlace").append(x);
		});

		//Tutor and Lab
		$("#TutorsAndLabTitle").append(json.tutorsAndLabInformation.title)
		x = "<p>" + json.tutorsAndLabInformation.description + "</p>"
		x += "<button type='button' class='btn btn - outline - primary mb-3'>"
		x += "<a href='" + json.tutorsAndLabInformation.tutoringLabHoursLink + "'>" + json.tutorsAndLabInformation.title + "</a></button>";
		$("#TutorsAndLabTitle").after(x);
	});

	// Pull the information from API 'Footer'
	myXhr('get', {
		path: '/footer/'
	},
		"#footer").done(function (json) {
			$(".rounded-social-buttons").append(json.copyright.html);
		});

});


$(document).ajaxComplete(function () {
	$("#js-rotating").Morphext({
		// The [in] animation type. Refer to Animate.css for a list of available animations.
		animation: "flipInX",
		// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
		separator: ",",
		// The delay between the changing of each phrase in milliseconds.
		speed: 2000,
		complete: function () {
			// Called after the entrance animation is executed.
		}
	});

	$(".faculty-button").click(function () {
		$(".staff").fadeOut().hide();
		$(".faculty").fadeIn(100);
		$(".faculty-button").addClass("active");
		$(".staff-button").removeClass("active");

	});

	$(".staff-button").click(function () {
		$(".faculty").fadeOut().hide();
		$(".staff").fadeIn(100);
		$(".faculty-button").removeClass("active");
		$(".staff-button").addClass("active");
	});

	//$('.collapse').collapse();

})