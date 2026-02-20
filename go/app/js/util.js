<!-- ==================== UTIL ==================== -->

function escapeHtml(str) {
        return str.replace(/[&<>"']/g, function (char) {
          return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          }[char];
        });
      }
