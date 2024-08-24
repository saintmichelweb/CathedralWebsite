Schedule service
----------------

{
  "schedule": {
    "officeHours": {
      "cards": [
        {
          "title": "Office Hours",
          "details": [
            {
              "days": "Tuesday - Saturday",
              "hours": "09:00 - 17:00"
            },
            {
              "days": "Sunday",
              "hours": "09:00 - 14:00"
            },
            {
              "days": "Monday",
              "hours": "Closed"
            }
          ]
        },
        {
          "title": "Parish Priest Appointment Schedule",
          "appointments": [
            {
              "day": "Tuesday",
              "time": "16:00 - 19:00"
            },
            {
              "day": "Thursday",
              "time": "16:00 - 19:00"
            }
          ]
        },
        {
          "title": "Parish Vicar Appointment Schedule",
          "appointments": [
            {
              "day": "Monday",
              "time": "16:00 - 19:00"
            },
            {
              "day": "Friday",
              "time": "16:00 - 19:00"
            }
          ]
        }
      ]
    },
    <!-- "massTimes": {
      "weekly": {
        "sunday": [
          {
            "time": "08:00"
          },
          {
            "time": "10:00"
          },
          {
            "time": "12:00"
          },
          {
            "time": "18:00"
          }
        ],
        "mondayToFriday": [
          {
            "time": "08:00"
          },
          {
            "time": "18:00"
          }
        ]
      }
    }, -->
    "specialMasses": {
      "masses": [
        {
          "type": "Marriage Mass",
          "description": "Special mass for weddings",
          "schedule": [
            {
              "day": "Saturday",
              "time": "14:00",
              "requestedBy": "John Doe"
            },
            {
              "day": "Sunday",
              "time": "15:00",
              "requestedBy": "Jane Smith"
            }
          ]
        },
        {
          "type": "Funeral Mass",
          "description": "Special mass for funerals",
          "schedule": [
            {
              "day": "Monday",
              "time": "10:00",
              "requestedBy": "Michael Johnson"
            },
            {
              "day": "Thursday",
              "time": "11:00",
              "requestedBy": "Emily Davis"
            }
          ]
        },
        {
          "type": "Other Special Mass",
          "description": "Any other special mass",
          "schedule": [
            {
              "day": "Special Event Day",
              "time": "18:00",
              "requestedBy": "Sarah Wilson"
            }
          ]
        }
      ]
    },
    "sacramentOfPenance": {
      "schedule": [
        {
          "day": "Wednesday",
          "time": "17:00 - 19:00"
        },
        {
          "day": "Saturday",
          "time": "10:00 - 12:00"
        }
      ]
    }
  }
}

Service Participation and Engagement
-------------------------------------

{
  "serviceParticipationAndEngagement": {
    "volunteerOpportunities": {
      "categories": [
        {
          "name": "Community Outreach",
          "description": "Engage with local communities through various outreach programs.",
          "opportunities": [
            {
              "title": "Food Bank Assistance",
              "details": "Help distribute food to those in need at the local food bank.",
              "contact": "Jane Doe - (555) 123-4567"
            },
            {
              "title": "Homeless Shelter Support",
              "details": "Assist with organizing and running the local homeless shelter.",
              "contact": "John Smith - (555) 987-6543"
            }
          ]
        },
        {
          "name": "Event Volunteering",
          "description": "Assist in planning and executing parish events.",
          "opportunities": [
            {
              "title": "Parish Festival",
              "details": "Help with various tasks during the annual parish festival.",
              "contact": "Emily Brown - (555) 456-7890"
            },
            {
              "title": "Fundraising Gala",
              "details": "Support the organization and execution of fundraising events.",
              "contact": "Michael Green - (555) 678-1234"
            }
          ]
        }
      ]
    },
    "religiousEducation": {
      "categories": [
        {
          "name": "Children's Programs",
          "description": "Educational programs designed for children.",
          "programs": [
            {
              "title": "First Communion Preparation",
              "details": "Classes and activities to prepare children for First Communion.",
              "schedule": "Every Sunday at 10:00 AM",
              "contact": "Sarah Wilson - (555) 234-5678"
            },
            {
              "title": "Vacation Bible School",
              "details": "A week-long summer program with Bible lessons and activities.",
              "schedule": "July 15 - July 19, 9:00 AM - 12:00 PM",
              "contact": "Karen Lee - (555) 345-6789"
            }
          ]
        },
        {
          "name": "Adult Education",
          "description": "Programs aimed at adult learners.",
          "programs": [
            {
              "title": "Bible Study Groups",
              "details": "Weekly Bible study groups for adults.",
              "schedule": "Wednesdays at 7:00 PM",
              "contact": "Paul White - (555) 456-7890"
            },
            {
              "title": "Sacrament Preparation",
              "details": "Classes for adults preparing for sacraments.",
              "schedule": "Monthly, first Monday at 6:00 PM",
              "contact": "Linda Harris - (555) 678-1234"
            }
          ]
        }
      ]
    },
    "youthMinistry": {
      "categories": [
        {
          "name": "High School Activities",
          "description": "Programs and events for high school students.",
          "activities": [
            {
              "title": "Youth Retreats",
              "details": "Weekend retreats focusing on spiritual growth and community.",
              "schedule": "Quarterly",
              "contact": "James Taylor - (555) 789-0123"
            },
            {
              "title": "Service Projects",
              "details": "Community service projects organized for high school students.",
              "schedule": "Monthly",
              "contact": "Lisa Martinez - (555) 890-1234"
            }
          ]
        },
        {
          "name": "Middle School Activities",
          "description": "Programs and events for middle school students.",
          "activities": [
            {
              "title": "Youth Group Meetings",
              "details": "Regular meetings with games, discussions, and prayer.",
              "schedule": "Fridays at 6:00 PM",
              "contact": "Robert King - (555) 901-2345"
            },
            {
              "title": "Summer Camp",
              "details": "A week-long summer camp with fun activities and spiritual lessons.",
              "schedule": "August 5 - August 9",
              "contact": "Nancy Adams - (555) 012-3456"
            }
          ]
        }
      ]
    },
    "adultsFormation": {
      "categories": [
        {
          "name": "Bible Study",
          "description": "In-depth Bible study sessions for adults.",
          "sessions": [
            {
              "title": "Old Testament Study",
              "details": "Exploring the Old Testament in detail.",
              "schedule": "Tuesdays at 7:00 PM",
              "contact": "Steven Clark - (555) 234-5678"
            },
            {
              "title": "New Testament Study",
              "details": "Exploring the New Testament in detail.",
              "schedule": "Thursdays at 7:00 PM",
              "contact": "Jessica Lewis - (555) 345-6789"
            }
          ]
        },
        {
          "name": "Spiritual Enrichment",
          "description": "Programs designed to deepen spiritual life.",
          "programs": [
            {
              "title": "Retreats and Workshops",
              "details": "Spiritual retreats and workshops throughout the year.",
              "schedule": "Quarterly",
              "contact": "Angela Robinson - (555) 456-7890"
            },
            {
              "title": "Prayer Groups",
              "details": "Small groups for communal prayer and reflection.",
              "schedule": "Weekly, Mondays at 7:00 PM",
              "contact": "Daniel Walker - (555) 567-8901"
            }
          ]
        }
      ]
    },
    "socialServices": {
      "categories": [
        {
          "name": "Counseling Services",
          "description": "Counseling and support services for individuals and families.",
          "services": [
            {
              "title": "Family Counseling",
              "details": "Support for families dealing with various issues.",
              "contact": "Rachel Young - (555) 678-9012"
            },
            {
              "title": "Personal Counseling",
              "details": "One-on-one counseling for personal issues.",
              "contact": "George Turner - (555) 789-0123"
            }
          ]
        },
        {
          "name": "Financial Assistance",
          "description": "Support for individuals and families in financial need.",
          "services": [
            {
              "title": "Emergency Assistance",
              "details": "Short-term financial help for emergencies.",
              "contact": "Mary Scott - (555) 890-1234"
            },
            {
              "title": "Budget Counseling",
              "details": "Advice and support for budgeting and financial planning.",
              "contact": "Thomas Baker - (555) 901-2345"
            }
          ]
        }
      ]
    },
    "communityBuilding": {
      "categories": [
        {
          "name": "Social Events",
          "description": "Events designed to build community and fellowship.",
          "events": [
            {
              "title": "Community BBQ",
              "details": "A social gathering with food and activities for all ages.",
              "schedule": "First Saturday of the month, 12:00 PM",
              "contact": "Laura Hall - (555) 012-3456"
            },
            {
              "title": "Game Night",
              "details": "A night of games and fun for parishioners.",
              "schedule": "Third Friday of the month, 7:00 PM",
              "contact": "Richard Allen - (555) 123-4567"
            }
          ]
        },
        {
          "name": "Small Groups",
          "description": "Smaller gatherings focused on specific interests or support.",
          "groups": [
            {
              "title": "Book Club",
              "details": "Monthly meetings to discuss selected books.",
              "schedule": "Last Monday of the month, 6:30 PM",
              "contact": "Nancy Lewis - (555) 234-5678"
            },
            {
              "title": "Crafting Group",
              "details": "Weekly group for crafting and socializing.",
              "schedule": "Wednesdays at 2:00 PM",
              "contact": "Samantha Wright - (555) 345-6789"
            }
          ]
        }
      ]
    },
    "liturgicalMinistries": {
      "categories": [
        {
          "name": "Liturgical Roles",
          "description": "Roles involved in the liturgical services.",
          "roles": [
            {
              "title": "Altar Servers",
              "details": "Assist during the Mass by handling liturgical items.",
              "contact": "Julia Moore - (555) 456-7890"
            },
            {
              "title": "Lectors",
              "details": "Read scripture passages during Mass.",
              "contact": "David Wilson - (555) 567-8901"
            }
          ]
        },
        {
          "name": "Music Ministries",
          "description": "Involvement in the parish’s music and choir activities.",
          "ministries": [
            {
              "title": "Adult Choir",
              "details": "Provides music during Sunday Mass and special events.",
              "schedule": "Rehearsals: Thursdays at 7:00 PM",
              "contact": "Karen Evans - (555) 678-9012"
            },
            {
              "title": "Children's Choir",
              "details": "Choir for children that sings at special Masses.",
              "schedule": "Rehearsals: Tuesdays at 5:00 PM",
              "contact": "Mark Taylor - (555) 789-0123"
            }
          ]
        }
      ]
    }
  }
}

Sacramental Preparation
-----------------------

{
  "sacramentalPreparation": {
    "baptism": {
      "categories": [
        {
          "name": "Infant Baptism",
          "description": "Preparation and scheduling for the baptism of infants.",
          "details": [
            {
              "title": "Preparation Classes",
              "description": "Mandatory classes for parents and godparents.",
              "schedule": "First Monday of each month, 7:00 PM",
              "contact": "Emma Johnson - (555) 123-4567"
            },
            {
              "title": "Baptism Scheduling",
              "description": "Schedule the date and time for the baptism ceremony.",
              "contact": "Father Michael - (555) 234-5678"
            }
          ]
        },
        {
          "name": "Adult Baptism",
          "description": "Preparation for adults seeking baptism.",
          "details": [
            {
              "title": "RCIA Program",
              "description": "Rite of Christian Initiation for Adults, including catechesis and spiritual formation.",
              "schedule": "Wednesdays at 7:00 PM",
              "contact": "Sister Mary - (555) 345-6789"
            },
            {
              "title": "Baptism Ceremony",
              "description": "Details for scheduling and conducting the baptism ceremony.",
              "contact": "Father John - (555) 456-7890"
            }
          ]
        }
      ]
    },
    "firstCommunion": {
      "categories": [
        {
          "name": "Children's First Communion",
          "description": "Preparation for children receiving their First Communion.",
          "details": [
            {
              "title": "First Communion Classes",
              "description": "Classes for children and their parents.",
              "schedule": "Sundays at 11:00 AM",
              "contact": "Mrs. Thompson - (555) 567-8901"
            },
            {
              "title": "First Communion Ceremony",
              "description": "Schedule and details for the First Communion ceremony.",
              "contact": "Father Robert - (555) 678-9012"
            }
          ]
        },
        {
          "name": "Adult First Communion",
          "description": "Preparation for adults receiving their First Communion.",
          "details": [
            {
              "title": "Adult Formation Sessions",
              "description": "Special sessions for adults preparing for First Communion.",
              "schedule": "Tuesdays at 6:00 PM",
              "contact": "Deacon James - (555) 789-0123"
            },
            {
              "title": "Communion Ceremony",
              "description": "Details for scheduling and conducting the First Communion for adults.",
              "contact": "Father Paul - (555) 890-1234"
            }
          ]
        }
      ]
    },
    "confirmation": {
      "categories": [
        {
          "name": "Teen Confirmation",
          "description": "Preparation for teenagers receiving the sacrament of Confirmation.",
          "details": [
            {
              "title": "Confirmation Classes",
              "description": "Classes for teens and their sponsors.",
              "schedule": "Thursdays at 6:30 PM",
              "contact": "Ms. Davis - (555) 901-2345"
            },
            {
              "title": "Confirmation Ceremony",
              "description": "Scheduling and details for the Confirmation ceremony.",
              "contact": "Bishop Green - (555) 012-3456"
            }
          ]
        },
        {
          "name": "Adult Confirmation",
          "description": "Preparation for adults seeking Confirmation.",
          "details": [
            {
              "title": "Adult Confirmation Classes",
              "description": "Classes focused on preparation for adults.",
              "schedule": "Mondays at 7:00 PM",
              "contact": "Father David - (555) 123-4568"
            },
            {
              "title": "Confirmation Ceremony",
              "description": "Scheduling and details for the Confirmation ceremony for adults.",
              "contact": "Archbishop Nelson - (555) 234-5679"
            }
          ]
        }
      ]
    },
    "wedding": {
      "categories": [
        {
          "name": "Marriage Preparation",
          "description": "Preparation for couples preparing for marriage.",
          "details": [
            {
              "title": "Pre-Marital Counseling",
              "description": "Counseling sessions for engaged couples.",
              "schedule": "By appointment",
              "contact": "Counselor Lisa - (555) 345-6780"
            },
            {
              "title": "Marriage Prep Classes",
              "description": "Mandatory classes for couples preparing for marriage.",
              "schedule": "Saturdays at 10:00 AM",
              "contact": "Father Mike - (555) 456-7891"
            }
          ]
        },
        {
          "name": "Wedding Ceremony",
          "description": "Details for scheduling and conducting wedding ceremonies.",
          "details": [
            {
              "title": "Wedding Scheduling",
              "description": "Schedule the date and time for the wedding ceremony.",
              "contact": "Parish Office - (555) 567-8902"
            },
            {
              "title": "Wedding Rehearsal",
              "description": "Rehearsal details and scheduling.",
              "contact": "Father Joseph - (555) 678-9013"
            }
          ]
        }
      ]
    }
  }
}









1. Secrétariat
* iminsi y'akazi: mardi-Vendredi
 8h00-17h00  samedi 8h00-12h00. Pause 12h00-13h00
Tel. 0788521097
Louise

2. Comptabilité 
 lundi-vendredi
* Amasaha: 8h00-17h00
*Yvonne NIYIBIGENA
Tel 0788745140

3. Caritas
 lundi- vendredi, de 8h00-17h00.
*Akurikirana kandi akakira abafute ibibazo bikeneye ubufasha mu buryo butandukanye(abatishoboye muri rusange) kubatega amatwi kumenya neza icyo Paroisse yabagasha.
Tel. 0788751048
Umuhoza Marie Claire

4. Sacristie
* service irebana na misa n'izindi gahunda zose zirebana na Kiliziya(gutegura misa, ect....)
Lundi-Dimanche 6h-16h
Sr Mediatrice/
Tel 0787273862

5. Catechese
 Mercredi-dimanche
 8h00-17h00
* We akurikira gahunda zose z'amasakramentu. Harimo gutegurwa kw'abitegura kuyahabwa.
Sr Christine
Tel. 0780339646

 Benoite 
Tel 0788683295

Office ya Padiri Mukuru
Jeudi
9h-17h
Tel:0788300646
Abbé  Innocent Consolateur