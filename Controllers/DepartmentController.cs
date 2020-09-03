﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using System.Configuration;
using WebApplication.Models;
using System.Data;
using System.Data.SqlClient;

namespace WebApplication.Controllers
{
    public class DepartmentController : ApiController
    {


        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            string query = @"select DepartmentID, DepartmentName from 
                             dbo.Departments
                                ";
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString)) 
            using(var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Department dep)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"
                                insert into dbo.Departments values ('" + dep.DepartmentName + @"')
                                ";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Succesfully";
            }
            catch (Exception)
            {
                return "Failed To Add";

            }
        }


        public string Put(Department dep)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"
                                update dbo.Departments set DepartmentName='" +dep.DepartmentName+@"'
                                    where DepartmentID = " +dep.DepartmentID + @"
                                ";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Updated Succesfully";
            }
            catch (Exception)
            {
                return "Failed To Update";

            }
        }


        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"
                               delete from dbo.Departments where DepartmentID = " + id;
                                
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Deleted Succesfully";
            }
            catch (Exception)
            {
                return "Failed To Delete";

            }
        }

    }
}
