# 리스트 #1
myList = ['오예스', '몽쉘', '초코파이', '초코파이', '초코파이'] # ,로 구분해서 넣을수 있음
myList2 = [1, 3.14, True, False, None, '아무거나'] # 파이선의 리스트는 뭐든지 다 넣을수 있음
myList3 = [] # 빈 리스트도 가능
print(type(myList))

# 리스트 인덱싱
print(myList2[4]) # 특정 인덱스
print(myList2[0:3]) # 범위

# 리스트 포함여부 : in
print('몽쉘' in myList) # 포함여부는 in으로

# 리스트 갯수 : len
print(len(myList2)) # 갯수는 len

# 리스트 맨뒤에 추가 : append
myList3.append('ABC') # 맨뒤에 값추가. : .apeend()
print(myList3)
myList3.append('def') # 맨뒤에 값추가 : .apeend()
print(myList3)

# 리스트에서 삭제 : remove
myList.remove('초코파이') # 값 삭제
print(myList)
# myList.remove('빅파이') # 값 삭제시 없으면 ValueError Exception!
myList.remove('몽쉘') # 값 삭제
print(myList)

# myList2.remove('3.14') # 3.14는 실수 형태인데 문자열로 넣으면 에러
myList2.remove(3.14) # 명확히 넣어줄것
print(myList2)

# 리스트 합치기 : extend
myList.extend(myList2)
print(myList)

###############################
# INDEX:     0    1    2    3
GD_LIST = [ 'a', 'b', 'c', 'd']
###############################

# 원하는 위치에 추가 : insert
gdList = GD_LIST # 주소 복사임. 값복사가 아님!!!!!!!!!!
gdList.insert(2, 3.14) # 2번인덱스(c)앞에 추가. 
print('gdList:', gdList)
print('GD_LIST:', GD_LIST)

# 원하는 위치(생략시 마지막)의 값 삭제 : pop # pop() pop(2)
###############################
# INDEX:     0    1    2    3    4    5
GD_LIST = [ 'z', 'x', 'a', 'b', 'c', 'd']
print('# GD_LIST:', GD_LIST)
###############################
gdList = GD_LIST.copy() # 값복사를 위해 copy() 함수 이용.
popped = gdList.pop()
print(f'# gdList,pop() : {popped} gdList({gdList}) GD_LIST({GD_LIST})')

gdList = GD_LIST.copy() # 값복사를 위해 copy() 함수 이용.
popped = gdList.pop(2)
print(f'# gdList.pop(2) :{popped} gdList({gdList}) GD_LIST({GD_LIST})')

# 모든값 삭제 : clear
gdList = GD_LIST.copy() # 값복사를 위해 copy() 함수 이용.
gdList.clear()
print(f'# after gdList.clear() : {gdList}')

# 값 순서대로 정렬 : sort
gdList = GD_LIST.copy()
gdList.sort()
print('# after sort:', gdList)

# 값 뒤집기 : reverse
gdList = GD_LIST.copy()
gdList.reverse()
print('# after reverse:', gdList)

# 특정값의 갯수 세기 : count 
gdList = GD_LIST.copy()
gdList.append('x')
gdList.append('x') # 이러고 나면 x는 총 3개
print('# gdList:', gdList)
 # 이러면 x는 3개
print(f'# gdList.count("x") : {gdList.count("x")}')

# 어떤값이 어디(index)에 있는지 : index # 0부터 맨처음에 나타난 위치의 index를 반환
print("# gdList.index('x'):", gdList.index('x'))

# [팁]
# - tuple <-> list는 강제 형변환으로 서로 대입이 가능하다!!
# - dictionary -> list 는 강제 형변환으로 key값만을 가진 list로 변환이 가능하다!!
# - list -> dicitonary로 가려면 dict.fromkeys(lst) 처럼 사용하면 lst를 dictionary로도 변환 가능!