window.onload = function () {

	// Video
	var video = document.getElementById("main-video");
	var slider = document.getElementById("slider-range");

	var itemContainers = [].slice.call(document.querySelectorAll('.board-column-content'));
	var columnGrids = [];
	var boardGrid;

	// Define the column grids so we can drag those
	// items around.
	itemContainers.forEach(function (container) {

		// Instantiate column grid.
		var grid = new Muuri(container, {
				items: '.board-item',
				layoutDuration: 400,
				layoutEasing: 'ease',
				dragEnabled: true,
				dragSort: function () {
					return columnGrids;
				},
				dragSortInterval: 0,
				dragContainer: document.body,
				dragReleaseDuration: 400,
				dragReleaseEasing: 'ease'
			})
			.on('dragStart', function (item) {
				// Let's set fixed widht/height to the dragged item
				// so that it does not stretch unwillingly when
				// it's appended to the document body for the
				// duration of the drag.
				item.getElement().style.width = item.getWidth() + 'px';
				item.getElement().style.height = item.getHeight() + 'px';
			})
			.on('dragReleaseEnd', function (item) {
				// Let's remove the fixed width/height from the
				// dragged item now that it is back in a grid
				// column and can freely adjust to it's
				// surroundings.
				item.getElement().style.width = '';
				item.getElement().style.height = '';
				// Just in case, let's refresh the dimensions of all items
				// in case dragging the item caused some other items to
				// be different size.
				columnGrids.forEach(function (grid) {
					grid.refreshItems();
				});
			})
			.on('layoutStart', function () {
				// Let's keep the board grid up to date with the
				// dimensions changes of column grids.
				boardGrid.refreshItems().layout();
			});

		// Add the column grid reference to the column grids
		// array, so we can access it later on.
		columnGrids.push(grid);

	});

	// Instantiate the board grid so we can drag those
	// columns around.
	boardGrid = new Muuri('.board', {
		layoutDuration: 400,
		layoutEasing: 'ease',
		dragEnabled: true,
		dragSortInterval: 0,
		dragStartPredicate: {
			handle: '.board-column-header'
		},
		dragReleaseDuration: 400,
		dragReleaseEasing: 'ease'
	});

	$(function () {
		$("#slider-range").slider({
			range: true,
			min: 0,
			max: video.duration,
			values: [0, 50],
			slide: function (event, ui) {
				$("#amount").val(ui.values[0] + "s - " + ui.values[1] + "s");
			}
		});
		$("#amount").val($("#slider-range").slider("values", 0) +
			"s - " + $("#slider-range").slider("values", 1) + "s");
	});

	$("#add_button").click(function () {
		var start = $('#slider-range').slider("values")[0].toString();
		var end = $('#slider-range').slider("values")[1].toString();
		var range = start + "," + end;
		var new_vid = "<div class='board-item'>" +
			"<div class='board-item-content'>" +
			"<video class='new-vid' controls>" +
			"<source src='./videos/The Imitation Game.mp4#t=" +
			range +
			"'type='video/mp4'>" +
			"</video>" +
			"</div>" +
			"</div>";

		$("#playlist").append(new_vid);
	});
}