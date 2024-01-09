function renderViewer(analyzerData, branchName = 'master', projectName = '') {
  return `
	  <!DOCTYPE html>
	  <html lang="en">
	  <head>
		  <meta name="viewport" content="width=device-width, initial-scale=1"/>
		  <meta charset="UTF-8">
		  <title>Title</title>
		  <script>
			  window.enableWebSocket = true;
		  </script>
		  <script src="viewer.js"></script>
	  </head>
	  <body>
	  <div id="app"></div>
	  <script>
        window.analyzerData = ${JSON.stringify(analyzerData)};
        window.projectName = ${JSON.stringify(projectName)};
        window.branchName = ${JSON.stringify(branchName)};
    </script>
	  </body>
	  </html>
  `;
  }

export {
  renderViewer
}
