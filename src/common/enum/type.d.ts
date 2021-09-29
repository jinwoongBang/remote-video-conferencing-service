type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type ExcuteType = 'CREATED' | 'READ' | 'UPDATED' | 'DELETED';
interface ResponseEntity {
  excute: ExcuteType;
}
