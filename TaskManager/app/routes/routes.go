// GENERATED CODE - DO NOT EDIT
// This file provides a way of creating URL's based on all the actions
// found in all the controllers.
package routes

import "github.com/revel/revel"


type tStatic struct {}
var Static tStatic


func (_ tStatic) Serve(
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.Serve", args).URL
}

func (_ tStatic) ServeDir(
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.ServeDir", args).URL
}

func (_ tStatic) ServeModule(
		moduleName string,
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "moduleName", moduleName)
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.ServeModule", args).URL
}

func (_ tStatic) ServeModuleDir(
		moduleName string,
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "moduleName", moduleName)
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.ServeModuleDir", args).URL
}


type tTestRunner struct {}
var TestRunner tTestRunner


func (_ tTestRunner) Index(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("TestRunner.Index", args).URL
}

func (_ tTestRunner) Suite(
		suite string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "suite", suite)
	return revel.MainRouter.Reverse("TestRunner.Suite", args).URL
}

func (_ tTestRunner) Run(
		suite string,
		test string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "suite", suite)
	revel.Unbind(args, "test", test)
	return revel.MainRouter.Reverse("TestRunner.Run", args).URL
}

func (_ tTestRunner) List(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("TestRunner.List", args).URL
}


type tCAuth struct {}
var CAuth tCAuth


func (_ tCAuth) Init(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CAuth.Init", args).URL
}

func (_ tCAuth) Login(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CAuth.Login", args).URL
}

func (_ tCAuth) Logout(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CAuth.Logout", args).URL
}

func (_ tCAuth) Check(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CAuth.Check", args).URL
}

func (_ tCAuth) GetCurrentEmployee(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CAuth.GetCurrentEmployee", args).URL
}


type tCBook struct {}
var CBook tCBook


func (_ tCBook) Init(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CBook.Init", args).URL
}

func (_ tCBook) GetAll(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CBook.GetAll", args).URL
}

func (_ tCBook) GetByID(
		id int64,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("CBook.GetByID", args).URL
}

func (_ tCBook) Create(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CBook.Create", args).URL
}

func (_ tCBook) Update(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CBook.Update", args).URL
}

func (_ tCBook) Delete(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CBook.Delete", args).URL
}


type tCEmployee struct {}
var CEmployee tCEmployee


func (_ tCEmployee) Init(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CEmployee.Init", args).URL
}

func (_ tCEmployee) GetAll(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CEmployee.GetAll", args).URL
}

func (_ tCEmployee) GetByID(
		id int64,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("CEmployee.GetByID", args).URL
}

func (_ tCEmployee) Create(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CEmployee.Create", args).URL
}

func (_ tCEmployee) Update(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CEmployee.Update", args).URL
}

func (_ tCEmployee) Delete(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CEmployee.Delete", args).URL
}

func (_ tCEmployee) GetCardBooks(
		id int64,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("CEmployee.GetCardBooks", args).URL
}


type tCError struct {}
var CError tCError


func (_ tCError) Unauthorized(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CError.Unauthorized", args).URL
}


type tCEvent struct {}
var CEvent tCEvent


func (_ tCEvent) Init(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CEvent.Init", args).URL
}

func (_ tCEvent) GetAll(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CEvent.GetAll", args).URL
}

func (_ tCEvent) GetByBookID(
		id int64,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("CEvent.GetByBookID", args).URL
}

func (_ tCEvent) GetByEmployeeID(
		id int64,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("CEvent.GetByEmployeeID", args).URL
}

func (_ tCEvent) Create(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CEvent.Create", args).URL
}

func (_ tCEvent) GetLastForBook(
		id int64,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("CEvent.GetLastForBook", args).URL
}


type tCIndex struct {}
var CIndex tCIndex


func (_ tCIndex) Init(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CIndex.Init", args).URL
}

func (_ tCIndex) Index(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CIndex.Index", args).URL
}


type tCPosition struct {}
var CPosition tCPosition


func (_ tCPosition) Init(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CPosition.Init", args).URL
}

func (_ tCPosition) GetAll(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CPosition.GetAll", args).URL
}


