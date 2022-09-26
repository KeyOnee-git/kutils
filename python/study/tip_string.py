# 문자열 처리
str1 = 'Waltz'
str2 = 'Jam'
str1KR = '왈츠'
str2KR = '잼'
print('Hello' + ' ' + 'Gomdor')
print(str1, len(str1)) # 문자열 길이 : len('문자열')
print(str2, len(str2))
print(str1KR, len(str1KR))
print(str2KR, len(str2KR))

# 여러줄문자 : 주석처럼 작은따옴표3개 붙여서 사용하면 됨
strMultiLine = '''이것은 멀티
라인을 만들어줄수
있습니다. 
\'\'\'로 사용가능'''
print('멀티라인:', strMultiLine)

# 문자열 메소드 #1
#           0123456789 
alphabet = 'abcDEfg hijk lmNOp qRs tUv wX y z'
print(alphabet.lower()) # 소문자 : abcdefg hijk lmnop qrs tuv wx y z
print(alphabet.upper()) # 대문자 : ABCDEFG HIJK LMNOP QRS TUV WX Y Z
print(alphabet.capitalize()) # 첫글자만 대문자 나머지 소문자: Abcdefg hijk lmnop qrs tuv wx y z
print(alphabet.title()) # 각 단어들의 첫글자만 대문자로 나머진 소문자: Abcdefg Hijk Lmnop Qrs Tuv Wx Y Z
print(alphabet.swapcase()) # 대소문자 반전 : ABCdeFG HIJK LMnoP QrS TuV Wx Y Z
print(alphabet.split()) # 문자열 나누기 : ['abcDEfg', 'hijk', 'lmNOp', 'qRs', 'tUv', 'wX', 'y', 'z']
print(alphabet.count('hij')) # '글자수 세기' : 1

# 문자열 메소드 #2
print(alphabet.startswith('abc')) # '글자'로 시작하는지 여부 : True
print(alphabet.endswith('y z')) # '글자'로 시작하는지 여부 : True
alpha1 = '...기러기 .. 스위스. 인도인... 별똥별.......'
print(alpha1.strip('.')) # 앞뒤로 글자 제거 aka TRIM
print(alpha1.replace('별똥별', '역삼역')) # 문자열 교체
print(alphabet.find('hi')) # 문자열 찾아서 INDEX 반환 : 8
alpha2 = '크래프톤'
print(alpha2.center(10, '#')) # 문자열을 가운데에 넣기 : ###크래프톤### 
# print(alpha2.center(20, 'AB')) # 문자열을 가운데에 넣기 : ERROR ! ONLY ONE CHARACTER AVALIABLE

# 문자열 출력
python = 'PYTHON'
java = 'JAVA'
print('개발 언어에는 ' + python + ',' + java + ' 등이 있습니다.')
print('개발 언어에는', python,',', java, '등이 있습니다.')
print('개발 언어에는 {}, {} 등이 있습니다.'.format(python, java)) # 순서대로 들어감
print('개발 언어에는 {1}, {0} 등이 있습니다.'.format(python, java)) # 명시적으로 지정도 가능
print(f'개발 언어에는 {python}, {java} 등이 있습니다.') # f-string : JAVASCRIPT의 ``와 유사

# 탈출문자. 줄바꿈\n 탭\t
print('이것은\t그것이\t맞는가?\n아닌가? 그런가?')