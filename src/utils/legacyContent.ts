const LEGACY_TESTING_CONTENT =
  /\b(sqa|software quality assurance|software qa|qa engineer|software testing|manual testing|test automation|test cases|test suite|playwright|cypress|selenium|postman|erpnext|stlc|jira|defect tracking|bug tracking|regression testing)\b/i;

export function containsLegacyTestingContent(value: string): boolean {
  return LEGACY_TESTING_CONTENT.test(value);
}
