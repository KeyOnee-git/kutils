# 파이선 표준 라이브러리
# https://docs.python.org/ko/3/library/index.html

''' 여러줄 주석은
작은따옴표 연달아 3개로 설정
'''

# 출력
print('hello gomdor') # '가능
print("아으아") # " 도 가능
print(True)
print(False)

# 대입은 = 
A = 3.14
B = 1
S = 'Hello my friend'

# 삭제는 del 변수
del A
del B

# 형병환
int('2') # 정수로

float('1.5') # 실수로

str(2) # 문자로

a1 = 'Hello'
a2 = '    '
a3 = ''
print('bool(0):', bool(0)) # 불리언으로 : False
print('bool(1):', bool(1)) # 불리언으로 : True
print('bool(2):', bool(2)) # 불리언으로 : True
print('a1:', bool(a1)) # bool로 값의 존재 유무로 반환 : True
print('a2:', bool(a2)) # bool로 값의 존재 유무로 반환 : True
print('a3:', bool(a3)) # bool로 값의 존재 유무로 반환 : False
print('None:', bool(None)) # False

# 산술연산자 + - * / % += -= *= /=
# 몫
print(7 // 3) # 몫: 2
print(5 ** 2) # 거듭제곱: 25

# 비교연산자 > >= < <= == !=

# 논리연산자 and or not
print(3 <5 and 7 < 5) # False
print(3 <= 5 or 7 < 5) # True
print(not 3 < 5) # False

# 멤버연산자
print('c' in 'cat') # 포함 여부 : True
print('c' not in 'cat') # 미포함 여부 : False
print('hell' in 'hello') # True

# 인덱스 와 슬라이싱 : 0Base
lang = 'PYTHON'
print(lang[5]) # N
print(lang[-1]) # N : -1은 마지막을 의미
print(lang[-2]) # N : -2은 뒤에서 두번째
### 콜론(:)으로 범위 지정 가능!!!
print(lang[1:6]) # 인덱스 1부터 6직전(exclude)까지
print(lang[1:]) # 인덱스 1부터 마지막까지. 콜론(:)뒤를 비워두면 끝까지 라는 의미
print(lang[2:-1]) # 2부터 마지막(-1) 직전까지 의미.... 마지막을 하고 싶다면 위의 의미로 할것.
print(lang[:]) # 처음부터 끝까지의 의미