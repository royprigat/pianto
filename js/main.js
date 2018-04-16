$(document).ready(function () {

	activeClasses();
	initVideoPlayer();
	initControls();
	initKeyboard();

	//create piano with 3 octaves, starting at C4 (lowest key)
	//shows labels and octave shift buttons
	var keyboardHTML = htmlForKeyboardWithOctaves(3, octaves.C4, true, true)
	//render the keyboard in the div
	$("#keyboardContainer").html(keyboardHTML)
	//when keys are pressed updatePreview() is called
	bindKeysToFunction(updatePreviewWithNote)
	//when the clef is changed updatePreviewWithClef() is called
	bindClefSelectionToFunction(updatePreviewWithClef)
	//set the default clef to G4
	setSelectedClef(clefs.G4)


	//this stores all keyboard input
	var plaineEasieCodes = []
	var selectedClef = clefs.G4

	//this is called whenever a piano key is pressed
	function updatePreviewWithNote(sender, paeNote) {
		console.log("key pressed is " + paeNote)
		plaineEasieCodes.push(paeNote)
		updateNotesSVG()
	}

	//this is called when the user changes the clef for display
	function updatePreviewWithClef(sender, clef) {
		console.log("clef changed to " + clef)
		selectedClef = clef
		updateNotesSVG()
	}

	function updateNotesSVG() {
		//render the notes to an SVG using the Verovio tookit
		//width of the svg is 800px and note scaling 50%
		var notesSVG = svgNotesForPlaineEasieCode(plaineEasieCodes.join(""), selectedClef, 800, 50)
		//insert thes SVG code in our div
		var svgContainerDiv = $('#svgNotesContainer')
		svgContainerDiv.html(notesSVG)
	}

	$('#home_btn').on('click', function (e) {
		e.preventDefault();
		$('.title').html('Library');
		$('#content').children().show();
		$('#keyboardContainer').hide();
		$('#svgNotesContainer').hide();
	});

	$('#classroom_btn').on('click', function (e) {
		e.preventDefault();
		$('.title').html('Lessons');
		$('#content').children().hide();
		$('#keyboardContainer').show();
		$('#svgNotesContainer').show();
	});

	$('interstellar-lessons').hide();
	$('imitation-lessons').hide();
	$('darknight-lessons').hide();
	$('gladiator-lessons').hide();
	$('#keyboardContainer').hide();
	$('#svgNotesContainer').hide();
});