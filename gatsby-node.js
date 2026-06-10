const { getResumePath } = require("./scripts/getResumePath")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@resume-data": getResumePath(),
      },
    },
  })
}
