# Gemini Directive

- 질문에는 해당하는 대답만 하고 코드를 임의로 수정하는 일이 없도록 합니다.
- 개념이나 원리에 대한 질문, 특히 리액트 초보자를 위한 질문을 받으면, `docs/` 폴더 안에 적절한 제목의 마크다운 파일을 생성하여 상세하고 이해하기 쉽게 답변합니다.

# Tech Stack

- **Framework**: React (^19.0.0)
- **Bundler**: Vite (^4.4.5)
- **Linter**: ESLint (^8.45.0)
- **Dependencies**:
  - react: ^19.0.0
  - react-dom: ^19.0.0
- **Dev Dependencies**:
  - @vitejs/plugin-react: ^4.0.3
  - eslint: ^8.45.0
  - vite: ^4.4.5

# Tool Usage

- **`context7 mcp`**: 코드에 대한 답변을 할 때는 `context7 mcp`를 사용하여 버전에 맞는 Best Practice를 레퍼런스하여 답변합니다.
- **`playwright mcp`**: 에러 수정이나 디버깅과 같은 해결을 요하는 답변에는 `playwright mcp`를 적극 활용하여 직접 화면 스크린샷을 찍는 등의 테스트를 통해 답변합니다.

# Docs Folder Structure

- **`@docs/anwser/**`**: 질문에 대한 답변을 할 때, 해당 질문에 맞는 주제를 정해 `md` 형식으로 답변을 작성합니다.
- **`@docs/notion/example_notion.md`**: 문서 작성을 요청받으면, git 변경 사항을 전부 체크하고 사용자가 지정한 주제에 맞춰 `@docs/notion/example_notion.md` 형식에 따라 문서를 작성합니다. 예시 문서는 AWS 관련 내용이지만, 형식만 따르면 됩니다.