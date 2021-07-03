/**
 * typescript 에서 generic 을 사용할 때,
 * 특정 interface 를 implements 하는 generic 타입 구현이 불가능한 것 같다.
 *
 * 그래서 interface 로 구현해야 하나, 어쩔수 없이 class 형태로 구현
 *
 * VO 에 대한 공통 로직을 여기서 처리하면 좋을 것 같다.
 */
class OnTheAirVO {}

export default OnTheAirVO;
