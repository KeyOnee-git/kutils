# 딕셔너리 {key1:value1, key2:value2, key3:value3, ...}
# - key, value

# 선언 One-Line
person1 = { '이름':'홍길동', '나이': 18, '키': 182.4, '여친유무': True}

# 선언 Multi-Line
person2 = { 
    'name':'홍길동', 
    'age': 18, 
    'height': 182.4, 
    'girlfriend': True
}

print(person1['이름'])
# print(person2.name) # !!! .은 사용불가!!!!!! 에러!!!

# 값획득 : get : 값이 없으면 None 출력. person2['friendCount']는 에러임. 
print(person2.get('friendCount'))
print(person2.get('age'))

# 단일 값 추가/수정
person2['address'] = 'Seoul Gang-Nam 127-ro'
person2['age'] = 7 #  수정
print(person2)

# 여러 값 추가/수정 : update
person2.update({'age':17, 'zipcode':'63357'})
print(person2)

# 특정 키 삭제: pop
person2.pop('zipcode')
print(person2)

# 전체삭제 : clear
person1.clear()
print(person1)

# 키 값 확인 : keys
print(person2.keys())

# Value 값 확인 : values
print(person2.values())

# key:value 쌍으로 값 확인 : items
print(person2.items())

######## 기타 메소드들
# fromkeys() : 제공된 keys를 통해 새로운 딕셔너리 생성 및 반환 : fromkeys
newDic = person2.fromkeys(person2.keys())
print(newDic)

newDic2 = person2.fromkeys(['age', 'height'])
print(newDic2)

# popitem() : 마지막에 추가된 데이터 삭제 : popitem
newDic2.popitem()
print(newDic2)

# setdefault() : key에 해당하는 value 반환. key가 없다면 새로 만들고 default value설정 및 반환